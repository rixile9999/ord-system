"""results.json에서 standalone SVG를 만든다. 이 선택적 도구에는 Matplotlib이 필요하다."""

import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

folder = Path(__file__).resolve().parent
points = json.loads((folder / "results.json").read_text())["points"]
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 10, "svg.hashsalt": "ord-decision-quality"})
fig, ax = plt.subplots(figsize=(8, 5.5), layout="constrained")
groups = [
    ([p for p in points if not p["pareto"]], "o", "#8993a5", "Other feasible pairs", False),
    ([p for p in points if p["pareto"] and p["support_alpha"]], "o", "#3b5fe2", "Supported Pareto points", True),
    ([p for p in points if p["pareto"] and not p["support_alpha"]], "D", "#8b571f", "Unsupported Pareto point", False),
]
for group, marker, color, label, filled in groups:
    ax.scatter([p["cost"] for p in group], [p["spread"] for p in group], marker=marker, facecolors=color if filled else "none", edgecolors=color, s=55, linewidths=1.4, label=label, zorder=3)
for p in points:
    if p["pareto"]:
        ax.annotate(f'({p["cost"]}, {p["spread"]})', (p["cost"], p["spread"]), xytext=(7, 9), textcoords="offset points", fontsize=10)
ax.set(xlabel="Assignment cost (minimize)", ylabel="Load spread (minimize)", xlim=(5, 18), ylim=(0, 7), title="Decision quality: 26 feasible objective pairs")
ax.set_xticks(range(6, 19, 2))
ax.set_yticks(range(8))
ax.grid(axis="y", color="#d9dee7", linewidth=.6)
ax.spines[["top", "right"]].set_visible(False)
ax.legend(loc="upper right", frameon=False, fontsize=9)
fig.text(.5, -.025, "Synthetic instance: 81 assignments, 32 feasible, 4 Pareto objective pairs.\nExact enumeration; no product performance claim.", ha="center", fontsize=9, color="#536171")
fig.savefig(folder / "objective-pairs.svg", bbox_inches="tight", metadata={"Date": None, "Title": "Decision quality: feasible objective pairs", "Description": "Synthetic resource allocation experiment. Exact data are provided in results.json."})
svg = folder / "objective-pairs.svg"
svg.write_text("\n".join(line.rstrip() for line in svg.read_text().splitlines()) + "\n")
plt.close(fig)
