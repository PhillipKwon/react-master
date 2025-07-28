# Vue Todo App

Vue 3 + TypeScript + Vite + Electron으로 만든 데스크톱 Todo 애플리케이션입니다.

## 🚀 기능

- ✅ 할일 추가, 수정, 완료, 삭제
- 🔄 스와이프로 할일 상태 변경
- 📅 날짜별 할일 관리
- 🗂️ 상태별 필터링 (전체/진행중/완료/삭제됨)
- 🗑️ 자동 정리 (하루 이상 지난 완료된 할일 숨김)
- 💾 로컬 스토리지 자동 저장
- 🖥️ 데스크톱 앱 (Electron)

## 🛠️ 기술 스택

- **Frontend**: Vue 3 + TypeScript + Composition API
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Desktop**: Electron
- **Build Tool**: Vite
- **Icons**: Lucide Vue Next

## 📦 설치 및 실행

### 개발 모드

```bash
# 의존성 설치
npm install

# 웹 개발 서버 실행
npm run dev

# Electron 개발 모드 실행
npm run electron:dev
```

### 프로덕션 빌드

```bash
# 웹 빌드
npm run build

# Electron 앱 빌드
npm run electron:build

# 빌드된 앱 미리보기
npm run electron:preview
```

## 🎯 사용법

1. **할일 추가**: 제목과 날짜를 입력하고 "할일 추가하기" 버튼 클릭
2. **할일 수정**: 할일 제목을 클릭하여 편집
3. **할일 완료**: 카드를 오른쪽으로 스와이프
4. **할일 삭제**: 카드를 왼쪽으로 스와이프
5. **필터링**: 상단 뱃지를 클릭하여 상태별 필터링
6. **정리**: "만료된 할일 정리" 버튼으로 오래된 완료 항목 삭제

## 📁 프로젝트 구조

```
vue-todo/
├── src/
│   ├── components/     # Vue 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── stores/        # Pinia 스토어
│   ├── types/         # TypeScript 타입 정의
│   └── router/        # Vue Router 설정
├── electron/          # Electron 메인 프로세스
├── public/            # 정적 파일
└── dist/              # 빌드 출력
```

## 🔧 스크립트

- `npm run dev` - 웹 개발 서버
- `npm run build` - 웹 프로덕션 빌드
- `npm run electron:dev` - Electron 개발 모드
- `npm run electron:build` - Electron 앱 빌드
- `npm run electron:preview` - 빌드된 앱 미리보기
- `npm run lint` - 코드 린팅
- `npm run format` - 코드 포맷팅
