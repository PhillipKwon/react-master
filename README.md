# React Master Monorepo

React와 Vue 프로젝트들을 포함한 모노레포입니다.

## 📦 프로젝트 구성

- **react-counter**: React + TypeScript 카운터 앱
- **vue-counter**: Vue 3 + TypeScript 카운터 앱
- **vue-todo**: Vue 3 + TypeScript + Electron 할일 관리 앱

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 설치

```bash
# 모든 의존성 설치
pnpm install
```

### 개발 서버 실행

```bash
# 모든 프로젝트 동시 실행
pnpm dev

# 특정 프로젝트만 실행
pnpm react:counter    # React 카운터
pnpm vue:counter      # Vue 카운터
pnpm vue:todo         # Vue 할일 앱
pnpm vue:todo:electron # Vue 할일 앱 (Electron)
```

### 빌드

```bash
# 모든 프로젝트 빌드
pnpm build

# 특정 프로젝트 빌드
pnpm --filter react-counter build
pnpm --filter vue-counter build
pnpm --filter vue-todo build
```

### 린트

```bash
# 모든 프로젝트 린트
pnpm lint
```

### 정리

```bash
# 모든 빌드 파일 정리
pnpm clean
```

## 📁 프로젝트 구조

```
react-master/
├── packages/
│   ├── react-counter/     # React 카운터 앱
│   ├── vue-counter/       # Vue 카운터 앱
│   └── vue-todo/          # Vue 할일 앱 (Electron)
├── package.json           # 루트 설정
├── pnpm-workspace.yaml    # 워크스페이스 설정
└── README.md
```

## 🛠 기술 스택

### React Counter

- React 19
- TypeScript
- Vite
- ESLint

### Vue Counter

- Vue 3
- TypeScript
- Vite
- Vue TSC

### Vue Todo

- Vue 3
- TypeScript
- Vite
- Pinia (상태 관리)
- Tailwind CSS
- Electron
- ESLint + Prettier

## 📝 스크립트

| 명령어                   | 설명                         |
| ------------------------ | ---------------------------- |
| `pnpm dev`               | 모든 프로젝트 개발 서버 실행 |
| `pnpm build`             | 모든 프로젝트 빌드           |
| `pnpm lint`              | 모든 프로젝트 린트           |
| `pnpm clean`             | 모든 빌드 파일 정리          |
| `pnpm react:counter`     | React 카운터 개발 서버       |
| `pnpm vue:counter`       | Vue 카운터 개발 서버         |
| `pnpm vue:todo`          | Vue 할일 앱 개발 서버        |
| `pnpm vue:todo:electron` | Vue 할일 앱 Electron 실행    |

## 🔧 개발 팁

### 새 프로젝트 추가

1. `packages/` 디렉토리에 새 프로젝트 생성
2. 루트 `package.json`에 스크립트 추가
3. `pnpm install` 실행

### 의존성 관리

- 공통 의존성은 루트 `package.json`에 추가
- 프로젝트별 의존성은 각 프로젝트의 `package.json`에 추가

## 📄 라이선스

MIT
