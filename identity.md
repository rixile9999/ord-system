# ORD Systems

**ORD = Operations Research & Decision**

ORD는 Operations Research와 Decision을 의미한다. 회사명은 ORD Systems로 표기하며, symbol을 붙이지 않은 text wordmark를 사용한다.

복잡한 운영 문제를 효율적으로 최적화하는 agentic AI를 만든다. 핵심은 mathematical optimization과 language model의 융합이다.

> Agentic decision systems. Grounded in mathematical optimization.

- Language model은 운영 맥락과 의도를 해석하고, 누락된 정보와 모호한 규칙을 확인하여 problem formulation을 돕는다.
- Mathematical optimization은 decision variables, constraints, objectives를 명시하여 가능한 대안을 계산하고 비교한다.
- Agent는 tools와 state를 통해 model 구성, solver 호출, validation, 권한이 부여된 작업의 실행, replanning을 연결한다. 다음 행동은 state, tool 결과, 사용자 응답에 따라 달라진다.

## Business vision

범용 AI만으로 해결하기 어려운 전문 업무를 위한 분야별 에이전트 서비스를 기업과 기관에 공급한다. 업무 지식과 운영 규칙을 반영해 복잡한 계획 수립과 반복 조정의 부담을 줄이는 것이 목표다.

전문 업무 시장은 산업·직무·조직별로 요구사항이 세분화되어 있고, 현장에 적용하려면 깊이 있는 제품화가 필요하다. 범용 플랫폼이 모든 세부 업무를 직접 제품화하기 어려운 영역에서 사업 기회를 찾는다. 빅테크의 불참이나 범용 AI의 영구적인 한계를 사업의 전제로 단정하지 않는다.

분야별 지식, 규칙, mathematical optimization, 현장 적용 경험을 제품에 축적한다. 공통 기술을 재사용하고 조직별 차이를 규칙과 설정으로 반영하여 반복 공급의 경제성을 확보하는 것이 전략이다. RN-AI의 간호사 근무 편성에서 시작해, 검증한 경험과 공통 기술을 바탕으로 전문 업무의 적용 범위를 넓히고자 한다. 확장과 경제성은 사업 방향이며 이미 입증된 실적으로 표현하지 않는다.

전문 업무에 필요한 품질을 충족하는 것을 기준으로 토큰 사용과 추론 비용을 최적화한다. 고도로 최적화한 오픈소스 기반 로컬 모델을 활용하고, 전체 워크플로우를 분석해 단계별로 필요한 전문 지식·절차와 범용 문제 해결 능력을 감지·분류한다. 단일 모델 대신 각 단계에 맞는 이종 모델과 에이전트를 배치하는 것이 서비스 설계 원칙이다. 고객 가치는 필요한 품질의 업무 결과를 얻는 데 드는 전체 처리 비용으로 설명한다. 공통 기술 재사용에 의한 개발·공급 효율과 모델 배치에 의한 운영 효율을 함께 추구한다. 비용 절감률, 성능 우위, 검증되지 않은 자동 평가·전환 기능을 실적으로 제시하지 않는다.

## Pages

사업적 지향점과 기술적 지향점은 별도 HTML 페이지로 제공한다. 공통 상단 메뉴에서 두 페이지를 전환하고, 언어를 바꾸면 현재 페이지와 slide를 유지한다. CSS와 JavaScript를 공유하며 build dependency는 없다.

페이지 제목과 메뉴명은 한국어 페이지에서도 영문과 동일하게 Business Vision, Technology Vision, Overview 등을 사용하고, 본문을 한국어로 번역한다.

- **사업적 지향점:** 영문 `index.html`, 한국어 `ko/index.html`. 회사 소개의 첫 진입 화면이다. 공통 메뉴 아래의 Vision과 Efficiency 목차로 두 화면을 이동한다. `#vision`에서 전문 업무 시장의 세분화, 고객 가치, 분야별 제품화의 기회, 공통 기술을 재사용하는 공급 전략을 설명한다. RN-AI를 첫 적용 분야로 소개하고 [서비스 intro](https://rn.ai.kr/intro)로 연결한다. `#efficiency`에서 품질을 기준으로 비용을 최적화하는 원칙과 로컬 모델·이종 모델 에이전트의 단계별 배치를 설명한다. 하단에서 기술적 지향점 페이지로 이동할 수 있다.
- **기술적 지향점:** 영문 `technology.html`, 한국어 `ko/technology.html`. 공통 상단 메뉴 아래에 기술 페이지의 목차를 표시하며, 다음 다섯 개의 vertical slide를 제공한다.

1. **Identity:** Operations Research & Decision의 initials와 두 기술의 역할을 설명한다.
2. **Problem formulation:** Operational context를 decision variables, constraints, objectives로 표현한다. Grounding과 clarification이 model의 가정을 명시하는 데 필요한 이유를 설명한다.
3. **Mathematical optimization:** General optimization formulation을 통해 feasibility, objective value, trade-offs를 설명한다. `x`는 decision variables, `θ`는 operational parameters, `f`는 objective, `g`는 constraints, `X`는 variable domain이다.
4. **Agentic orchestration:** Observe → Formulate → Solve → Validate → Act → Observe의 loop와 clarification, model revision, replanning이 필요한 조건을 보여준다. 다음 화면에서 실제 구현인 RN-AI로 연결한다.
5. **RN-AI:** 간호사 근무표 플랫폼의 실제 구조를 소개한다. UI와 agent의 shared domain services, OR-Tools CP-SAT, solver-independent evaluation을 설명하고 서비스 intro로 연결한다.

분리 전 소개 페이지의 기술 관련 hash는 같은 언어의 `technology.html` 내 해당 slide로 이동한다. 기존 hash `#planning`, `#model`, `#execution`도 관련 기술 slide로 연결한다. 이 이전 URL 호환 처리는 JavaScript를 사용하며, 페이지 메뉴와 새 URL은 JavaScript 없이도 동작한다.

## Visual identity

선택한 A안의 밝은 바탕과 정돈된 글자 위계를 사용한다. 배경은 `#FAFAF8`, 본문은 `#182230`, 설명은 `#536171`이다. 강조색은 사용자가 최종 선택한 밝은 코발트 `#3B5FE2`이며, 보조 면은 `#EDF1FC`, 구분선은 `#D9DEE7`이다. 강조색은 제목의 핵심 구절, 현재 메뉴, 링크와 도식의 연결에 일관되게 사용한다.

한글은 Pretendard Variable, 영문은 InterVariable을 사용한다. 글꼴 선택은 복잡한 기술을 명확하고 신뢰할 수 있는 업무 도구로 전달하려는 시각적 해석이다. 두 글꼴 자체에 ORD 고유의 의미가 있거나 독점적인 브랜드 서체인 것으로 설명하지 않는다. 제목은 650, 소제목은 600의 굵기로 위계를 만든다. IBM Plex Mono는 단계 번호와 기술 라벨에 사용한다. 데스크톱 본문은 18px, 모바일 본문은 16px, 주요 설명은 14–15px로 유지한다.

600px 이하에서는 설명이 많은 도식을 세로로 배치하고, 세부 목차를 Contents 버튼으로 접는다. 버튼은 열림 상태를 보조 기술에 전달하며 Escape, 목차 선택, 메뉴 밖 클릭 시 닫힌다. JavaScript가 없으면 목차를 그대로 표시한다. 상단 메뉴는 Business Vision과 Technology Vision으로 표기하고, 모바일에서는 각 메뉴를 두 줄로 배치한다. 한·영 페이지의 메뉴명은 동일하게 유지한다.

## Motion

Scroll로 화면에 들어온 내용은 순차적으로 나타난다. Diagram은 model 구성, 수식의 구성 요소, decision loop를 3.6초 이내의 animation으로 설명한다. 각 diagram의 Replay control로 다시 볼 수 있다. 화면을 벗어나거나 tab이 숨겨지면 diagram animation을 종료한다.

`prefers-reduced-motion: reduce`에서는 animation과 smooth scroll을 사용하지 않는다. JavaScript가 없어도 모든 본문과 diagram, navigation을 볼 수 있다. 기본 CSS는 내용을 숨기지 않는다.

## 표현 기준

기술을 소개할 때는 mathematical optimization을 사용한다. 목표와 필수 조건을 명시하고 solver로 해를 계산한다는 특성을 드러낸다. 모든 계산이 deterministic하다거나 모든 실제 운영 문제에서 global optimum을 보장한다는 표현은 사용하지 않는다.

Identity, problem formulation, mathematical optimization, agentic orchestration의 diagram은 기술 방향을 설명하는 conceptual architecture다. Business vision 화면은 회사의 사업 방향과 목표를 설명한다. RN-AI 화면은 구현에서 확인한 역할을 요약한다. UI와 agent가 공유하는 domain services, 화면 context, 병동별 데이터와 변경 이력, CP-SAT의 hard constraints 및 weighted penalties, optimization 없이 실행 가능한 evaluation을 표현한다. Evaluation은 optimization과 rule definitions를 공유하며, formal verification이나 model 밖의 정확성을 보장한다는 의미가 아니다. 실제 계산 중이라는 표현, 임의의 성능 수치, 실제 서비스에서 확인하지 않은 capability 주장을 넣지 않는다. Feasibility와 optimality는 정의한 model과 solve limits 안에서 평가한다.
