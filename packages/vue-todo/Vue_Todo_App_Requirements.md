# Vue Todo 앱 기능 요구사항 명세서

## 📋 프로젝트 개요

Vue 3 + TypeScript + Vite + Electron으로 구현된 데스크톱 Todo 애플리케이션의 기능 요구사항을 정리한 문서입니다.

---

## 🎯 핵심 기능 요구사항

### 1. 데이터 모델

#### Todo 엔티티

```typescript
interface Todo {
  id: number // 고유 식별자 (타임스탬프 기반)
  title: string // 할일 제목
  status: 'doing' | 'done' | 'deleted' // 상태
  dueDate?: string // 마감일 (선택사항, ISO 날짜 형식)
}
```

### 2. CRUD 작업

#### ✅ 할일 추가

- **기능**: 새로운 할일 생성
- **입력**: 제목 (필수), 마감일 (선택)
- **검증**: 제목은 비어있을 수 없음
- **동작**: 폼 제출 후 입력 필드 초기화

#### ✅ 할일 수정

- **기능**: 기존 할일 제목 편집
- **방법**: 할일 제목 클릭 → 인라인 편집
- **단축키**: Enter (저장), Escape (취소)
- **검증**: 빈 제목은 저장 불가

#### ✅ 할일 완료

- **기능**: 할일 상태를 'doing' → 'done' 변경
- **방법**:
  - 오른쪽 스와이프 (60px 이상)
  - 완료된 할일의 "되돌리기" 버튼 클릭

#### ✅ 할일 삭제

- **기능**: 할일 상태를 'deleted'로 변경 (소프트 삭제)
- **방법**: 왼쪽 스와이프 (60px 이상)
- **복구**: 삭제된 할일에서 "복원" 버튼으로 복구 가능

#### ✅ 영구 삭제

- **기능**: 데이터베이스에서 완전 제거
- **방법**: 삭제된 할일의 "영구삭제" 버튼
- **확인**: 사용자 확인 다이얼로그 표시

### 3. 상태 관리

#### 상태 정의

- **진행중** (`doing`): 활성 상태의 할일
- **완료** (`done`): 완료된 할일 (하루 이내만 표시)
- **삭제됨** (`deleted`): 삭제된 할일 (복구 가능)

#### 상태 전이

```
doing ←→ done
  ↓
deleted ←→ doing (복원)
```

### 4. 필터링 시스템

#### 필터 옵션

- **전체**: 모든 상태의 할일 표시
- **진행중**: `doing` 상태만 표시
- **완료**: `done` 상태만 표시 (하루 이내)
- **삭제됨**: `deleted` 상태만 표시

#### 필터 UI

- 상단 뱃지 형태의 필터 버튼
- 현재 선택된 필터 하이라이트
- 각 필터별 할일 개수 표시

### 5. 자동 정리 기능

#### 만료된 완료 항목

- **조건**: 마감일로부터 하루 이상 지난 완료된 할일
- **동작**: 자동으로 목록에서 숨김
- **관리**: "만료된 할일 정리" 버튼으로 영구 삭제

#### 정리 버튼

- **위치**: 필터 섹션에 표시
- **조건**: 만료된 완료 항목이 있을 때만 표시
- **기능**: 확인 후 영구 삭제

### 6. 사용자 인터페이스

#### 스와이프 제스처

- **오른쪽 스와이프** (60px 이상): 할일 완료
- **왼쪽 스와이프** (60px 이상): 할일 삭제
- **지원 환경**: 터치 디바이스 및 마우스
- **시각적 피드백**: 스와이프 시 배경 액션 영역 표시

#### 시각적 디자인

- **진행중**: 파란색 테마
- **완료**: 초록색 테마 (취소선)
- **삭제**: 빨간색 테마 (취소선)
- **카드 형태**: 둥근 모서리, 그림자 효과

#### 반응형 디자인

- **모바일**: 터치 최적화
- **데스크톱**: 마우스/키보드 지원
- **일관된 UX**: 모든 디바이스에서 동일한 경험

### 7. 데이터 지속성

#### 로컬 스토리지

- **저장 형식**: JSON
- **키**: `vue-todo-tasks`
- **자동 저장**: 모든 CRUD 작업 후 즉시 저장
- **에러 처리**: 저장/로드 실패 시 콘솔 로그

#### 데이터 복구

- **자동 로드**: 앱 시작 시 저장된 데이터 복원
- **초기화**: 데이터 없을 시 빈 배열로 시작

### 8. 통계 및 카운터

#### 실시간 통계

- **전체 할일 수**: 모든 상태의 할일 개수
- **진행중 할일 수**: `doing` 상태 개수
- **완료된 할일 수**: `done` 상태 개수 (하루 이내)
- **삭제된 할일 수**: `deleted` 상태 개수

#### 표시 위치

- 필터 버튼에 개수 표시
- 실시간 업데이트

### 9. 날짜 관리

#### 마감일 기능

- **설정**: 날짜 선택기로 마감일 선택
- **표시**: 할일 카드에 마감일 표시
- **선택사항**: 마감일 없이도 할일 생성 가능

#### 만료 로직

- **기준**: 마감일로부터 24시간 (86400000ms)
- **처리**: 하루 이상 지난 완료 항목 자동 숨김
- **계산**: 날짜 비교 시 시간 정보 제거

### 10. 사용자 경험

#### 빈 상태 처리

- **필터별 메시지**:
  - 전체: "할일이 없습니다. 새로운 할일을 추가해보세요!"
  - 진행중: "진행중인 할일이 없습니다."
  - 완료: "완료된 할일이 없습니다."
  - 삭제: "삭제된 할일이 없습니다."

#### 확인 다이얼로그

- **영구 삭제**: 사용자 확인 후 실행
- **만료 정리**: 확인 후 일괄 삭제

#### 접근성

- **키보드 네비게이션**: Enter, Escape 키 지원
- **포커스 관리**: 편집 모드 시 자동 포커스
- **시각적 피드백**: 호버, 포커스 상태 표시

---

## 🛠️ 기술적 요구사항

### 상태 관리

- **중앙집중식**: Pinia/Redux/Zustand 등
- **반응형**: 데이터 변경 시 자동 UI 업데이트
- **계산된 속성**: 필터링된 목록 캐싱

### 이벤트 처리

- **통합 이벤트**: 터치/마우스 이벤트 통합
- **제스처 인식**: 스와이프 방향 및 거리 계산
- **키보드 이벤트**: Enter (저장), Escape (취소)

### 데이터 저장

- **로컬 스토리지**: 브라우저 기반 저장
- **JSON 직렬화**: 데이터 변환 및 저장
- **에러 처리**: 저장/로드 실패 시 복구

### UI/UX

- **반응형**: 다양한 화면 크기 지원
- **애니메이션**: 부드러운 전환 효과
- **접근성**: WCAG 가이드라인 준수

---

## 📱 플랫폼 지원

### 데스크톱 (Electron)

- **크로스 플랫폼**: Windows, macOS, Linux
- **네이티브 앱**: 시스템 통합
- **오프라인**: 인터넷 연결 불필요

### 웹 브라우저

- **모던 브라우저**: Chrome, Firefox, Safari, Edge
- **반응형**: 모바일 브라우저 지원
- **PWA**: Progressive Web App 지원 가능

---

## 🔄 구현 우선순위

### Phase 1: 핵심 기능

1. Todo CRUD 작업
2. 상태 관리
3. 로컬 스토리지
4. 기본 UI

### Phase 2: 고급 기능

1. 스와이프 제스처
2. 필터링 시스템
3. 날짜 관리
4. 자동 정리

### Phase 3: 사용자 경험

1. 애니메이션 효과
2. 접근성 개선
3. 성능 최적화
4. 테스트 코드

---

## 📊 성능 요구사항

### 응답성

- **스와이프 반응**: 60fps 이상
- **필터링**: 즉시 반응
- **저장**: 100ms 이내

### 메모리 사용

- **최적화**: 불필요한 데이터 정리
- **캐싱**: 계산된 속성 활용
- **가비지 컬렉션**: 메모리 누수 방지

---

## 🧪 테스트 요구사항

### 단위 테스트

- **비즈니스 로직**: Todo CRUD 작업
- **상태 관리**: 필터링 및 계산
- **유틸리티**: 날짜 계산, 검증

### 통합 테스트

- **사용자 플로우**: 할일 생성부터 완료까지
- **데이터 지속성**: 저장/로드 기능
- **제스처**: 스와이프 동작

### E2E 테스트

- **전체 플로우**: 앱 시작부터 종료까지
- **크로스 브라우저**: 주요 브라우저 지원
- **반응형**: 다양한 화면 크기

---

_이 문서는 Vue Todo 앱의 기능 요구사항을 정의하며, 다른 기술 스택으로 구현할 때 참고할 수 있습니다._
