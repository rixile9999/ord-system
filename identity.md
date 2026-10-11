# ORD Systems

**ORD = Operations Research & Decision**

ORD는 Operations Research와 Decision을 의미한다. 회사명은 ORD Systems로 표기하며, symbol을 붙이지 않은 text wordmark를 사용한다.

복잡한 운영 문제를 효율적으로 최적화하는 agentic AI를 만든다. 핵심은 mathematical optimization과 language model의 융합이다.

- language model은 운영 상황과 사용자 의도를 이해하고, 모호하거나 빠진 조건을 확인한다.
- mathematical optimization은 명시적인 목표와 제약을 바탕으로 해를 계산한다.
- agent는 model 구성, 계산 결과 검토, 승인된 작업의 실행과 재계산을 연결한다.

## Homepage

네 개의 vertical slide로 구성한다.

1. **ORD의 의미:** Operations Research & Decision의 initials를 명확히 보여준다.
2. **운영 문제:** 가용 팀을 변경하면 방문 업무 배정과 총 이동 시간을 다시 계산하는 예시를 제공한다.
3. **Model 구성:** 요청의 모호한 조건을 확인하고 decision variables, constraints, objective로 표현하는 과정을 설명한다.
4. **재계산과 실행:** 가용 자원 변경에 따른 배정과 조건 확인을 설명한다. RN-AI는 실제 서비스로 짧게 소개하고 [intro](https://rn.ai.kr/intro)로 연결한다.

영문은 `index.html`, 한국어는 `ko/index.html`에서 제공한다. 언어 전환 시 현재 slide를 유지한다. CSS와 계산·navigation 코드는 두 페이지가 공유한다.

## 계산 예시

4개 팀이 같은 시간대의 방문 업무 3건을 맡는 작은 assignment problem이다. 각 방문에는 한 팀을 배정하고, 각 팀은 최대 한 건만 맡을 수 있다. 주어진 이동 시간의 합을 최소화한다.

`site.js`는 이 작은 예시의 가능한 모든 배정을 열거해 최소값을 계산한다. 예시의 입력과 결과를 실제 고객 실적이나 production solver의 성능으로 표현하지 않는다. Model 구성의 대화는 설명용 예시다.

## 표현 기준

기술을 소개할 때는 mathematical optimization을 사용한다. 목표와 제약을 명시하고 solver로 해를 계산한다는 특성을 드러낸다. 모든 계산이 deterministic하다거나 모든 실제 운영 문제에서 전역 최적해를 보장한다는 표현은 사용하지 않는다.
