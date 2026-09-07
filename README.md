# Veluga Global

벨루가 기업 랜딩페이지의 데스크톱 와이어프레임입니다. 히어로 모션, 두 제품 소개, 기술 역량 탐색, 활용 사례, 인재풀 폼의 화면 구조를 검토합니다.

## 로컬에서 보기

```sh
python3 -m http.server 8787 --bind 127.0.0.1 --directory wireframe
```

[검토 화면](http://127.0.0.1:8787/preview.html)에서 창 너비에 맞춰 보거나, [1920px 원본](http://127.0.0.1:8787/index.html)을 열 수 있습니다.

## 배포

```sh
node scripts/build.mjs
```

화면 파일과 로컬 Pretendard 자산만 `dist/`로 복사합니다. 별도 패키지 설치나 환경 변수는 필요하지 않습니다. Vercel은 저장소 루트의 `vercel.json` 설정으로 빌드하며, 기본 주소 `/`는 검토 화면을 표시합니다. `/preview.html`과 `/index.html`에서도 각각 검토 화면과 원본에 접근할 수 있습니다.

## 구성과 범위

- `wireframe/`: HTML, CSS, JavaScript와 폰트 자산. [화면별 설명 및 검증 기록](wireframe/README.md)
- `DESIGN.md`: Figma에서 확인한 디자인 기준
- `.design/company-landing/INFORMATION_ARCHITECTURE.md`: 콘텐츠와 탐색 구조
- `scripts/build.mjs`: 정적 배포 파일 생성

현재는 1920px 데스크톱 와이어프레임입니다. 영상·일부 사례·로고는 배치 영역이며, 인재풀 폼의 제출·저장·전송과 실제 언어 전환은 구현하지 않았습니다.

커밋은 `유형(화면명): 변경 내용` 형식을 사용합니다. `.env`와 `.env.*`는 Git에서 제외하며, 서버 비밀값을 `NEXT_PUBLIC_` 변수로 노출하지 않습니다.
