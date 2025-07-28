const path = require('path')

const { app, BrowserWindow, Menu, shell } = require('electron')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow

const createWindow = () => {
  // 메인 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    minWidth: 500,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, '../public/icon.svg'),
    titleBarStyle: 'default',
    show: false, // 윈도우가 준비될 때까지 숨김
    title: 'Vue Todo App',
  })

  // 개발 모드에서는 개발 서버 로드, 프로덕션에서는 빌드된 파일 로드
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    // 개발자 도구 열기
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // 윈도우가 준비되면 표시
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // 윈도우가 닫힐 때 앱 종료
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 외부 링크는 기본 브라우저에서 열기
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })
}

// 앱이 준비되면 윈도우 생성
app.whenReady().then(() => {
  createWindow()

  // macOS에서 dock 아이콘 클릭 시 윈도우 재생성
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 모든 윈도우가 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 보안: 새 윈도우 생성 방지
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault()
    shell.openExternal(navigationUrl)
  })
})

// 메뉴 설정
const createMenu = () => {
  const template = [
    {
      label: '파일',
      submenu: [
        {
          label: '새로고침',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload()
          },
        },
        {
          label: '개발자 도구',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools()
          },
        },
        { type: 'separator' },
        {
          label: '종료',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: '편집',
      submenu: [
        { role: 'undo', label: '실행 취소' },
        { role: 'redo', label: '다시 실행' },
        { type: 'separator' },
        { role: 'cut', label: '잘라내기' },
        { role: 'copy', label: '복사' },
        { role: 'paste', label: '붙여넣기' },
        { role: 'selectall', label: '모두 선택' },
      ],
    },
    {
      label: '보기',
      submenu: [
        { role: 'reload', label: '새로고침' },
        { role: 'forceReload', label: '강제 새로고침' },
        { role: 'toggleDevTools', label: '개발자 도구' },
        { type: 'separator' },
        { role: 'resetZoom', label: '실제 크기' },
        { role: 'zoomIn', label: '확대' },
        { role: 'zoomOut', label: '축소' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '전체 화면' },
      ],
    },
    {
      label: '도움말',
      submenu: [
        {
          label: '정보',
          click: () => {
            shell.openExternal('https://github.com/your-username/vue-todo')
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// 메뉴 생성
createMenu()
