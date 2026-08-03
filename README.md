# 🚀 Study & Project Repository

> **Slack, GitHub, Zapier, Supabase**를 연동하여 효율적인 협업 프로세스를 구축하고 개발하는 스터디 프로젝트입니다.

---

## 🎯 스터디 & 프로젝트 목표

* **자동화된 협업 환경 구축**: Slack-GitHub-Zapier 연동을 통한 브랜치/담당자별 맞춤 알림 및 자동 초대 시스템 구축
* **효율적인 Git 흐름 체득**: `main` - `develop` - `feature/*` 브랜치 전략을 통한 안전한 버전 관리
* **Supabase 기반 백엔드 아키텍처**: 별도의 백엔드 서버 없이 DB 스키마(SQL) 및 RLS 보안 정책 기반의 모던 웹 개발
* **체계적인 분업 체계**: 프론트엔드(`src/`)와 DB/백엔드(`supabase/`)의 명확한 역할 분담 및 TypeScript 타입 기반 개발

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 / 도구 |
| :--- | :--- |
| **Frontend** | React / Next.js, TypeScript |
| **Backend & DB** | Supabase (PostgreSQL) |
| **Collaboration** | GitHub, Slack, Zapier, Notion |

---

## 📁 프로젝트 폴더 구조 및 역할

본 프로젝트는 **Supabase 공식 CLI 표준 구조**를 준수하며, 프론트엔드 영역과 DB/백엔드 영역이 명확히 분리되어 있습니다.

```text
my-study-project/
├── .github/                  # GitHub Issue & PR 템플릿 및 CI/CD 워크플로
├── src/                      # 💻 [프론트엔드 담당 영역]
│   ├── components/           # UI 컴포넌트 모음
│   ├── pages/ (or app/)      # 라우팅 및 페이지 컴포넌트
│   └── types/                # TypeScript 타입 정의
│       └── supabase.ts       # ⭐️ DB 스키마 기반 자동 추출된 타입 (수정 금지)
├── supabase/                 # 🛡️ [DB & 백엔드 담당 영역]
│   ├── migrations/           # 📜 DB 테이블, RLS 보안 정책, SQL 함수 변경 이력
│   │   └── .gitkeep
│   └── seed.sql              # 🌱 로컬 개발 및 테스트용 초기 더미 데이터
├── .gitignore                # Git 추적 제외 파일 목록 (.env 등)
└── README.md                 # 프로젝트 안내 문서