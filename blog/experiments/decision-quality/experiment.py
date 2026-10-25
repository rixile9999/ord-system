#!/usr/bin/env python3
"""가상 resource allocation을 전수 열거한다. Python standard library만 사용한다."""

import argparse
from collections import Counter
from fractions import Fraction
from itertools import product
import json
from pathlib import Path


INSTANCE = {
    "effort": [2, 2, 3, 1],
    "capacity": [6, 6, 6],
    "cost": [[1, 3, 6], [1, 5, 3], [1, 4, 6], [1, 3, 5]],
    "allowed": [[1, 1, 0], [1, 1, 1], [1, 1, 1], [1, 1, 0]],
    "cost_scale": 10,
    "spread_scale": 8,
}


def dominates(a, b):
    return all(x <= y for x, y in zip(a, b)) and any(x < y for x, y in zip(a, b))


def support_interval(point, points):
    """모든 후보에 대한 선형 부등식을 풀어 alpha의 정확한 범위를 구한다."""
    low, high = Fraction(0), Fraction(1)
    intercept = Fraction(point[1], INSTANCE["spread_scale"])
    slope = Fraction(point[0], INSTANCE["cost_scale"]) - intercept
    for other in points:
        other_intercept = Fraction(other[1], INSTANCE["spread_scale"])
        other_slope = Fraction(other[0], INSTANCE["cost_scale"]) - other_intercept
        coefficient, rhs = slope - other_slope, other_intercept - intercept
        if coefficient > 0:
            high = min(high, rhs / coefficient)
        elif coefficient < 0:
            low = max(low, rhs / coefficient)
        elif rhs < 0:
            return None
    if low > high or high <= 0 or low >= 1:
        return None
    return [str(low), str(high)]


def score(point, alpha):
    return alpha * Fraction(point[0], INSTANCE["cost_scale"]) + (1 - alpha) * Fraction(point[1], INSTANCE["spread_scale"])


def run():
    rows = []
    allowed_count = 0
    for assignment in product(range(3), repeat=4):
        if not all(INSTANCE["allowed"][t][r] for t, r in enumerate(assignment)):
            continue
        allowed_count += 1
        loads = [sum(INSTANCE["effort"][t] for t, r in enumerate(assignment) if r == resource) for resource in range(3)]
        if any(load > cap for load, cap in zip(loads, INSTANCE["capacity"])):
            continue
        cost = sum(INSTANCE["cost"][t][r] for t, r in enumerate(assignment))
        rows.append({"assignment": [r + 1 for r in assignment], "loads": loads, "cost": cost, "spread": max(loads) - min(loads)})

    counts = Counter((row["cost"], row["spread"]) for row in rows)
    pairs = sorted(counts)
    frontier = [p for p in pairs if not any(dominates(q, p) for q in pairs)]
    points = []
    for pair in pairs:
        points.append({
            "cost": pair[0], "spread": pair[1], "count": counts[pair],
            "pareto": pair in frontier, "support_alpha": support_interval(pair, pairs),
            "representative": next(row for row in rows if (row["cost"], row["spread"]) == pair),
        })

    sweep = []
    for alpha in [Fraction(1, 4), Fraction(1, 2), Fraction(5, 9), Fraction(13, 20), Fraction(5, 7), Fraction(4, 5)]:
        best = min(score(p, alpha) for p in pairs)
        winners = [list(p) for p in pairs if score(p, alpha) == best]
        sweep.append({"alpha": str(alpha), "objective_pairs": winners, "score": str(best)})

    # 직접 계산한 값과 비교해 실험의 경계·동점을 확인한다.
    assert len(rows) == 32 and sum(counts.values()) == 32
    assert frontier == [(6, 6), (7, 5), (8, 2), (9, 1)]
    assert support_interval((7, 5), pairs) is None
    assert support_interval((6, 6), pairs) == ["5/7", "1"]
    assert support_interval((8, 2), pairs) == ["5/9", "5/7"]
    assert support_interval((9, 1), pairs) == ["0", "5/9"]
    assert sweep[2]["objective_pairs"] == [[8, 2], [9, 1]]
    assert sweep[4]["objective_pairs"] == [[6, 6], [8, 2]]
    for numerator in range(1, 100):
        alpha = Fraction(numerator, 100)
        best = min(score(p, alpha) for p in pairs)
        assert all(p in frontier for p in pairs if score(p, alpha) == best)
    assert all(sum(row["loads"]) == sum(INSTANCE["effort"]) for row in rows)

    return {
        "instance": INSTANCE,
        "counts": {"all_assignments": 3 ** 4, "allowed_assignments": allowed_count, "feasible_assignments": len(rows), "objective_pairs": len(pairs), "pareto_pairs": len(frontier)},
        "points": points, "weight_sweep": sweep, "feasible_assignments": rows,
        "method": "exhaustive enumeration; exact rational support intervals; 0 < alpha < 1; interval endpoints 0 and 1 excluded",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", type=Path, help="기존 JSON 결과와 동일한지 확인한다.")
    args = parser.parse_args()
    report = run()
    if args.check:
        if json.loads(args.check.read_text()) != report:
            raise SystemExit("실험 결과가 저장된 JSON과 다릅니다.")
        print("실험 결과, Pareto frontier, weight 경계·동점 검증 통과")
    else:
        print(json.dumps(report, ensure_ascii=False, indent=2))
