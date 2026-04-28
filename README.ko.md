# Canvas

Canvas는 정적 웹 프로필 템플릿입니다. 이 문서는 템플릿을 가져다 본인의 프로필, 프로젝트 설명, 이미지, 링크로 바꾸려는 사용자를 위한 사용 가이드입니다.

영문 문서는 [README.md](./README.md)를 확인하세요.

## 수정 대상

일반적인 템플릿 사용자는 먼저 `data.js`를 수정하면 됩니다. HTML 구조는 이미 `data.js`의 내용을 읽도록 연결되어 있습니다.

- `ui`: 공통 라벨, 접근성 라벨, 플레이스홀더, 섹션 제목, 버튼 문구
- `profile`: 프로필 카드 내용, 연락처, 프로필 이미지 경로, 앞면 배지, 뒷면 문구
- `projects`: 프로젝트 카드 내용, 상세 내용, 대체 미리보기 설정, 이미지 경로, 외부 링크

시각 디자인을 바꾸려면 `styles.css`를 수정합니다. 페이지 구조 자체를 바꿀 때만 `index.html`을 수정합니다.

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

`assets/profile/`에는 프로필 이미지를 넣습니다. `assets/projects/`에는 프로젝트 썸네일과 상세 화면 이미지를 넣습니다. 빈 이미지 폴더도 git에 남도록 `.gitkeep` 파일이 들어 있습니다.

## 이미지 가이드

- 프로필 이미지: 가장 자연스럽게 맞추려면 `4:5` 세로 이미지를 사용합니다.
- 프로젝트 썸네일: `4:5` 세로 이미지를 사용하거나, 템플릿이 해당 영역에 맞게 이미지를 크롭하도록 둡니다.
- 프로젝트 상세 이미지: `images` 배열에 하나 이상의 스크린샷을 넣습니다. 상세 미리보기 영역도 `4:5` 세로 비율을 유지합니다.

## 빠른 시작

1. `data.js`의 `profile` 객체를 본인의 공개 프로필 정보로 바꿉니다.
2. `projects` 배열의 객체를 본인의 프로젝트로 바꿉니다.
3. 이미지 파일을 `assets/profile/` 또는 `assets/projects/`에 넣습니다.
4. 각 이미지 `src`를 `./assets/projects/project-01.png` 같은 상대 경로로 지정합니다.
5. 프로젝트 외부 이동 경로를 `links`에 넣고, 가장 중요한 링크를 첫 번째에 둡니다.
6. 브라우저에서 `index.html`을 열어 결과를 확인합니다.

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

`photo.src`가 비어 있으면 `ui.placeholders.profilePhoto` 값이 대신 표시됩니다.

## 프로젝트 데이터

```js
{
  id: "project-id",
  theme: "blue",
  placeholder: {
    type: "cards",
  },
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
    src: "./assets/projects/project-thumbnail.png",
    alt: "Project thumbnail",
  },

  images: [
    {
      src: "./assets/projects/project-screen-01.png",
      alt: "Project screen 1",
    },
    {
      src: "./assets/projects/project-screen-02.png",
      alt: "Project screen 2",
    },
  ],

  links: [
    {
      href: "https://example.com",
      label: "사이트 보기",
    },
    {
      href: "https://github.com/example/project",
      label: "GitHub",
    },
  ],
}
```

`image`는 카드 썸네일과 단일 이미지 대체값입니다. `images`는 전체화면 상세 갤러리입니다. `images`에 이미지가 여러 개 있으면 이전/다음 버튼과 카운터가 자동으로 표시됩니다.

`images`와 `image.src`가 모두 비어 있으면 생성된 대체 미리보기가 표시됩니다. `links`는 프로젝트 상세 화면에 표시되는 외부 버튼 목록입니다. `links`가 비어 있으면 상세 화면의 버튼 영역은 숨겨집니다. 기존 단일 `link` 객체도 대체값으로 계속 지원됩니다.

가장 중요한 이동 경로를 `links`의 첫 번째 항목에 둡니다. 버튼 영역은 우측 정렬이므로 보조 링크가 먼저 렌더링되고, 첫 번째 `links` 항목은 최우측의 메인 버튼으로 표시됩니다.

## 대체 미리보기 옵션

`placeholder.type`은 생성되는 미리보기 형태를 결정합니다.

- `cards`: 카드/타일형
- `bar-chart`: 세로 막대그래프형
- `line-chart`: 선형그래프형
- `dashboard`: 대시보드형
- `list`: 행/목록형

`theme`은 프로젝트 색상 세트를 결정합니다. 생성된 대체 미리보기와 프로젝트 상세 화면의 eyebrow, 메타데이터 라벨, 기능 불릿, 기술 스택 칩, 링크 버튼 같은 강조 색상에 적용됩니다.

- `blue`
- `green`
- `yellow`
- `red`

`theme`이 비어 있거나 알 수 없는 값이면 `blue`로 표시됩니다.

## 배포

정적 파일만 사용하므로 일반 정적 호스팅 서비스에 배포할 수 있습니다. GitHub Pages에 배포할 때는 다음 파일을 포함하면 됩니다.

- `index.html`
- `styles.css`
- `data.js`
- `script.js`
- `assets/`
