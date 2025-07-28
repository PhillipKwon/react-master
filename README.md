# React Master Monorepo

React와 Vue 프로젝트들을 포함한 Turborepo 기반 모노레포입니다.

## 프로젝트 구조

```
packages/
├── react-counter/     # React 카운터 앱
├── react-todo/        # React Todo 앱
├── vue-counter/       # Vue 카운터 앱
└── vue-todo/          # Vue Todo 앱 (Electron 지원)
```

## 기술 스택

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Frontend**: React 19, Vue 3
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Zustand (React), Pinia (Vue)
- **Styling**: Tailwind CSS

## 시작하기

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

모든 프로젝트 동시 실행:

```bash
pnpm dev
```

특정 프로젝트만 실행:

```bash
# React Counter
pnpm react:counter

# React Todo
pnpm react:todo

# Vue Counter
pnpm vue:counter

# Vue Todo
pnpm vue:todo

# Vue Todo (Electron)
pnpm vue:todo:electron
```

### 빌드

모든 프로젝트 빌드:

```bash
pnpm build
```

### 린트

모든 프로젝트 린트:

```bash
pnpm lint
```

### 포맷팅

코드 포맷팅:

```bash
pnpm format
```

포맷팅 검사:

```bash
pnpm format:check
```

### 정리

빌드 파일 정리:

```bash
pnpm clean
```

## 프로젝트별 기능

### React Counter

- React 19 + TypeScript
- 간단한 카운터 기능
- Vite 빌드 도구

### React Todo

- React 19 + TypeScript
- Zustand 상태 관리
- Tailwind CSS 스타일링
- 할 일 추가/삭제/완료 기능
- 로컬 스토리지 저장

### Vue Counter

- Vue 3 + TypeScript
- 간단한 카운터 기능
- Vite 빌드 도구

### Vue Todo

- Vue 3 + TypeScript
- Pinia 상태 관리
- Tailwind CSS 스타일링
- Electron 데스크톱 앱 지원
- 할 일 관리 기능

## Turborepo 기능

- **병렬 실행**: 모든 태스크가 병렬로 실행되어 빌드 시간 단축
- **캐싱**: 변경되지 않은 파일들은 캐시에서 재사용
- **의존성 관리**: 프로젝트 간 의존성을 자동으로 관리
- **원격 캐싱**: 팀원들과 빌드 캐시 공유 가능

## 개발 가이드

### 새 프로젝트 추가

1. `packages/` 디렉토리에 새 프로젝트 생성
2. `turbo.json`에 필요한 태스크 추가
3. 루트 `package.json`에 스크립트 추가

### 캐시 관리

캐시 초기화:

```bash
npx turbo clean
```

캐시 상태 확인:

```bash
npx turbo run build --dry-run
```
