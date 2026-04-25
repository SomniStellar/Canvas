# Canvas

Canvas는 정적 웹 프로필 템플릿입니다. `data.js`만 수정하면 HTML 구조를 직접 바꾸지 않고 프로필 카드, 소개/설명 영역, 프로젝트 카드, 전체화면 프로젝트 상세를 배포할 수 있습니다.

영문 문서는 [README.md](./README.md)를 확인하세요.

## 파일 구조

```text
Canvas/
  index.html
  styles.css
  data.js
  script.js
  assets/
    profile/
    projects/
```

`assets/profile/`에는 프로필 이미지를 넣고, `assets/projects/`에는 프로젝트 스크린샷이나 썸네일 이미지를 넣습니다. 빈 폴더도 git에 남도록 `.gitkeep` 파일을 포함했습니다.

## 빠른 수정

1. `data.js`의 `profile` 값을 본인 정보로 바꿉니다.
2. `projects` 배열에 프로젝트를 추가하거나 수정합니다.
3. 이미지는 `assets/profile/` 또는 `assets/projects/`에 넣고 `src` 경로를 지정합니다.
4. 브라우저에서 `index.html`을 열어 확인합니다.

## 데이터 구성

`data.js`는 수정 목적별로 나뉩니다.

- `ui`: 공통 라벨, 접근성 라벨, 플레이스홀더, 섹션 제목, 액션 문구
- `profile`: 프로필 카드 내용, 연락처, 이미지, 앞면 배지, 뒷면 문구
- `projects`: 프로젝트 카드/상세 내용, 이미지, 외부 링크

## UI 데이터

```js
ui: {
  aria: {
    cardStage: "명함 카드 영역",
    cardFlip: "명함 카드 뒤집기",
    projectClose: "프로젝트 상세 닫기",
  },
  labels: {
    email: "Email",
    phone: "Phone",
    role: "Role",
    result: "Result",
  },
  placeholders: {
    profilePhoto: "PHOTO",
  },
  sections: {
    projectsEyebrow: "Project Cards",
    projectsTitle: "Selected Works",
    featuresTitle: "핵심 기능",
    techTitle: "기술 스택",
  },
  actions: {
    projectLink: "링크 이동",
  },
}
```

## 프로필 데이터

```js
profile: {
  pageTitle: "Your Name | Web Profile",
  eyebrow: "Personal Business Card",
  name: "Your Name",
  englishName: "Your English Name",
  subtitle: "Short profile subtitle",
  frontBadge: "Profile",

  contact: {
    email: "you@example.com",
    phone: "000-0000-0000",
  },

  photo: {
    src: "./assets/profile/profile.png",
    alt: "Profile photo",
  },

  back: {
    title: "About Me",
    description: "Short introduction line 1\nShort introduction line 2",
    badge: "About",
  },
}
```

`photo.src`를 비워두면 `ui.placeholders.profilePhoto` 값이 표시됩니다.

## 배지 의미

배지는 현재 카드 면을 짧게 요약하는 용도입니다.

- 앞면: `Profile`이 적합합니다. 앞면은 이름, 사진, 연락처 등 프로필 정보를 보여줍니다.
- 뒷면: `About`이 적합합니다. 뒷면은 사람, 페이지, 또는 템플릿 목적을 설명합니다.

`Flip` 같은 동작 힌트와는 역할이 다릅니다. 회전 아이콘이 이미 상호작용을 알려주므로, 배지는 현재 면의 의미를 요약하는 편이 더 자연스럽습니다.

## 프로젝트 데이터

```js
{
  id: "project-id",
  theme: "default",
  eyebrow: "Project Type",
  title: "Project Name",

  card: {
    description: "Short card description.",
  },

  detail: {
    summary: "Longer detail-page summary.",
    role: "Your role",
    result: "Main outcome",
    features: ["Feature 1", "Feature 2"],
    tech: ["HTML", "CSS", "JavaScript"],
  },

  image: {
    src: "./assets/projects/project-name.png",
    alt: "Project screenshot",
  },

  link: {
    href: "https://example.com",
    label: "Open Link",
  },
}
```

`image.src`를 비워두면 템플릿 미리보기 그래픽이 표시됩니다. `link.href`를 비워두면 프로젝트 상세 화면의 링크 버튼이 숨겨집니다.

## 프로젝트 추가

`data.js`의 `projects` 배열에 객체를 하나 추가하면 카드가 자동 생성됩니다. 프로젝트 카드 HTML을 직접 복사할 필요는 없습니다.

## 배포

정적 파일만 사용하므로 GitHub Pages에 그대로 배포할 수 있습니다. 배포할 파일은 다음과 같습니다.

- `index.html`
- `styles.css`
- `data.js`
- `script.js`
- `assets/`
