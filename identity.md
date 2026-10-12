# ORD Systems

**ORD = Operations Research & Decision**

ORD는 Operations Research와 Decision을 의미한다. 회사명은 ORD Systems로 표기하며, symbol을 붙이지 않은 text wordmark를 사용한다.

복잡한 운영 문제를 효율적으로 최적화하는 agentic AI를 만든다. 핵심은 mathematical optimization과 language model의 융합이다.

> Agentic decision systems. Grounded in mathematical optimization.

- Language model은 운영 맥락과 의도를 해석하고, 누락된 정보와 모호한 규칙을 확인하여 problem formulation을 돕는다.
- Mathematical optimization은 decision variables, constraints, objectives를 명시하여 가능한 대안을 계산하고 비교한다.
- Agent는 tools와 state를 통해 model 구성, solver 호출, validation, 권한이 부여된 작업의 실행, replanning을 연결한다. 다음 행동은 state, tool 결과, 사용자 응답에 따라 달라진다.

## Homepage

영문 `index.html`과 한국어 `ko/index.html`은 같은 다섯 개의 vertical slide를 제공한다. 언어를 바꾸면 현재 slide를 유지한다. CSS와 JavaScript를 공유하며 build dependency는 없다.

1. **Identity:** Operations Research & Decision의 initials와 두 기술의 역할을 설명한다.
2. **Problem formulation:** Operational context를 decision variables, constraints, objectives로 표현한다. Grounding과 clarification이 model의 가정을 명시하는 데 필요한 이유를 설명한다.
3. **Mathematical optimization:** General optimization formulation을 통해 feasibility, objective value, trade-offs를 설명한다. `x`는 decision variables, `θ`는 operational parameters, `f`는 objective, `g`는 constraints, `X`는 variable domain이다.
4. **Agentic orchestration:** Observe → Formulate → Solve → Validate → Act → Observe의 loop와 clarification, model revision, replanning이 필요한 조건을 보여준다. 다음 화면에서 실제 구현인 RN-AI로 연결한다.
5. **RN-AI:** 간호사 근무표 플랫폼의 실제 구조를 소개한다. UI와 agent의 shared domain services, OR-Tools CP-SAT, solver-independent evaluation을 설명하고 [서비스 intro](https://rn.ai.kr/intro)로 연결한다.

기존 hash `#planning`, `#model`, `#execution`은 관련 새 slide로 연결한다.

## Motion

Scroll로 화면에 들어온 내용은 순차적으로 나타난다. Diagram은 model 구성, 수식의 구성 요소, decision loop를 3.6초 이내의 animation으로 설명한다. 각 diagram의 Replay control로 다시 볼 수 있다. 화면을 벗어나거나 tab이 숨겨지면 diagram animation을 종료한다.

`prefers-reduced-motion: reduce`에서는 animation과 smooth scroll을 사용하지 않는다. JavaScript가 없어도 모든 본문과 diagram, navigation을 볼 수 있다. 기본 CSS는 내용을 숨기지 않는다.

## 표현 기준

기술을 소개할 때는 mathematical optimization을 사용한다. 목표와 필수 조건을 명시하고 solver로 해를 계산한다는 특성을 드러낸다. 모든 계산이 deterministic하다거나 모든 실제 운영 문제에서 global optimum을 보장한다는 표현은 사용하지 않는다.

첫 네 화면의 diagram은 기술 방향을 설명하는 conceptual architecture다. RN-AI 화면은 구현에서 확인한 역할을 요약한다. UI와 agent가 공유하는 domain services, 화면 context, 병동별 데이터와 변경 이력, CP-SAT의 hard constraints 및 weighted penalties, optimization 없이 실행 가능한 evaluation을 표현한다. Evaluation은 optimization과 rule definitions를 공유하며, formal verification이나 model 밖의 정확성을 보장한다는 의미가 아니다. 실제 계산 중이라는 표현, 임의의 성능 수치, 실제 서비스에서 확인하지 않은 capability 주장을 넣지 않는다. Feasibility와 optimality는 정의한 model과 solve limits 안에서 평가한다.
