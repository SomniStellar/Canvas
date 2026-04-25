window.PORTFOLIO_DATA = {
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
  },

  profile: {
    pageTitle: "Hun.S Baek | Web Profile",
    eyebrow: "Personal Business Card",
    name: "백승훈",
    englishName: "Hun.S Baek",
    subtitle: "The Canvas of Myself",
    frontBadge: "Profile",

    contact: {
      email: "pablo37lc@gmail.com",
      phone: "010-0000-0000",
    },

    photo: {
      src: "",
      alt: "프로필 사진",
    },

    back: {
      title: "About This Canvas",
      description:
        "프로필과 이력, 프로젝트를\n한 화면에 정리한 웹 프로필입니다.\n각 프로젝트는 상세 설명과\n실제 링크로 이어집니다.",
      badge: "About",
    },
  },

  projects: [
    {
      id: "canvas",
      theme: "canvas",
      eyebrow: "Profile Template",
      title: "Canvas",

      card: {
        description: "정적 웹 프로필을 빠르게 구성하고 배포하기 위한 개인 명세 템플릿입니다.",
      },

      detail: {
        summary:
          "Canvas는 명함형 프로필, 이력 요약, 프로젝트 카드, 전체화면 프로젝트 상세를 한 페이지에 담는 정적 웹 프로필 템플릿입니다. data.js만 교체하면 다른 사람의 프로필로도 재사용할 수 있도록 구성했습니다.",
        role: "템플릿 구조 설계, 정적 UI 구현, 데이터 분리, 프로젝트 상세 오버레이 구성",
        result: "프로필 정보와 프로젝트 정보를 data.js에서 교체할 수 있는 재사용 가능한 웹 프로필 템플릿",
        features: [
          "프로필과 프로젝트 정보를 data.js로 분리해 템플릿 재사용성을 확보",
          "프로젝트 카드 클릭 시 포트폴리오 흐름을 유지하는 전체화면 상세 제공",
          "이미지 경로를 넣으면 카드와 상세 화면에 실제 프로젝트 이미지를 표시",
        ],
        tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      },

      image: {
        src: "",
        alt: "Canvas 웹 프로필 템플릿 미리보기",
      },

      link: {
        href: "",
        label: "",
      },
    },
    {
      id: "stock-ing",
      theme: "stocking",
      eyebrow: "Portfolio Monitor",
      title: "Stock_ing",

      card: {
        description: "Google Sheets 기반 미국 주식 포트폴리오 모니터링 웹앱입니다.",
      },

      detail: {
        summary:
          "Google Sheets를 주요 데이터 저장소로 사용해 미국 주식 포트폴리오를 모니터링하는 웹앱입니다. 이전 종가 기준으로 보유 현황을 확인하고, 벤치마크와 성과 흐름을 비교할 수 있습니다.",
        role: "기획, 프론트엔드 구현, Google 로그인 및 Sheets API 연동, GitHub Pages 배포",
        result: "자산 입력, 포트폴리오 요약, 벤치마크 비교, 차트 동기화까지 한 화면 흐름으로 정리",
        features: [
          "Google 로그인과 Google Sheets API를 브라우저에서 직접 연동",
          "템플릿 스프레드시트 생성 및 현재 보유 자산 조정 입력 지원",
          "포트폴리오 요약, 벤치마크 비교, 차트 동기화 대시보드 제공",
        ],
        tech: [
          "React",
          "TypeScript",
          "Vite",
          "Google Sheets API",
          "Google Identity Services",
          "Recharts",
        ],
      },

      image: {
        src: "",
        alt: "Stock_ing 포트폴리오 모니터링 화면",
      },

      link: {
        href: "https://somnistellar.github.io/Stocking/",
        label: "링크 이동",
      },
    },
  ],
};
