# Veluga Global Landing Design System

이 문서는 Veluga 글로벌 랜딩페이지 구현의 디자인 기준이다.
Figma 파일 `awItkOu02GU2KYDpyjK10D`의 선택된 `에셋` 페이지(`776:690`)를 2026-09-04에 직접 확인해 작성했다.

## 1. Scope and priority

- 포함: 컬러 Variables, Text Styles, 레이아웃 그리드, 로고, GNB, 버튼, 아이콘, 간격과 형태 규칙
- 제외: Footer와 Footer 내부 요소
- Figma의 등록값과 예시 표기가 충돌하면 Variable, Local Style, Component Variant의 실제 속성을 우선한다.
- 이 문서에 없는 토큰이나 컴포넌트 상태는 임의로 추가하지 않는다. 필요하면 Figma와 이 문서를 함께 갱신한다.

## 2. Spatial system

### 2.1 Multiples

- 새 간격과 컴포넌트 치수는 `4px` 배수를 우선한다.
- 조밀한 UI나 기존 컴포넌트 호환이 필요할 때만 `2px` 배수를 사용한다.
- 사용 가능한 기본 간격: `2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80px`.
- `14px`, `18px` 버튼 패딩처럼 Figma 컴포넌트에 정의된 2배수 값은 그대로 유지한다.
- 글자 크기, 행간 계산값, Stretch Grid의 계산된 컬럼 폭은 배수 규칙을 위해 임의 반올림하지 않는다.
- 관련 요소는 Auto Layout 또는 웹의 Flex/Grid로 묶고, gap과 padding에 위 값을 사용한다.

### 2.2 Layout grid

`Layout Grid` Variable 컬렉션과 실제 프레임에 아래 3개 모드가 있다. 모두 `STRETCH` column grid다.

| Mode | Reference frame | Columns | Gutter | Margin | Content width |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop | 1920 × 1080 | 12 | 20px | 240px | 1440px |
| Tablet | 744 × 1133 | 8 | 16px | 24px | 696px |
| Mobile | 390 × 844 | 4 | 10px | 16px | 358px |

- 웹 구현에서는 `max-width: 1440px`의 중앙 정렬 콘텐츠 컨테이너를 Desktop 기준으로 사용한다.
- Tablet과 Mobile은 좌우 margin을 각각 `24px`, `16px`로 유지한다.
- 위 프레임 폭은 디자인 검수 기준이며 CSS breakpoint 자체가 아니다. breakpoint는 실제 콘텐츠가 무너지는 지점에서 정한다.
- Figma의 Tablet 안내 문구에는 content width가 `680px`로 적혀 있지만, Variable 값과 실제 744px 프레임의 24px 양쪽 margin은 모두 `696px`를 가리킨다. 구현은 `696px`를 기준으로 한다.

### 2.3 Layout Grid variables

| Variable | Desktop | Tablet | Mobile |
| --- | ---: | ---: | ---: |
| `grid/frame-width` | 1920 | 744 | 390 |
| `grid/columns` | 12 | 8 | 4 |
| `grid/gutter` | 20 | 16 | 10 |
| `grid/margin` | 240 | 24 | 16 |
| `grid/content-width` | 1440 | 696 | 358 |

현재 Grid Variable은 프레임의 Layout Grid 속성에 직접 bind되어 있지 않다. 코드에서는 표의 값을 한 세트로 관리한다.

## 3. Color system

### 3.1 Variable collections

| Collection | Mode | Count | Role |
| --- | --- | ---: | --- |
| `Atomic` | `Default` | 80 | 원시 컬러 팔레트 |
| `Theme` | `Light` | 29 | Primary, Status, Label, Line 의미 토큰과 opacity |
| `Layout Grid` | `Desktop`, `Tablet`, `Mobile` | 5 | 반응형 그리드 수치 |

현재 모든 Variable scope는 `ALL_SCOPES`이며 code syntax는 등록되어 있지 않다. 웹 코드의 CSS 변수명은 프로젝트에서 일관되게 매핑하되 Figma에 등록된 이름과 alias 관계는 바꾸지 않는다.

### 3.2 Atomic palette

Atomic 컬러는 Theme token의 기반이다. Theme token이 있는 역할에는 Atomic을 직접 사용하지 않는다.

| Palette | Tokens |
| --- | --- |
| Gray | `white #FFFFFF`, `50 #F7F7F8`, `100 #F3F4F5`, `200 #ECEDEE`, `300 #CFD2D5`, `400 #B6BBC0`, `450 #9EA5AB`, `500 #868E96`, `600 #6B7278`, `700 #50555A`, `800 #36393C`, `900 #1B1C1E`, `950 #111213`, `black #000000` |
| Blue | `50 #EFF6FF`, `100 #DBEAFE`, `200 #BFDBFE`, `300 #93C5FD`, `400 #60A5FA`, `500 #3B82F6`, `600 #146EF5`, `700 #1D4ED8`, `800 #1E40AF`, `900 #1E3A8A`, `950 #172554` |
| Red | `50 #FEF2F2`, `100 #FEE2E2`, `200 #FECACA`, `300 #FCA5A5`, `400 #F87171`, `500 #EF4444`, `600 #DC2626`, `700 #B91C1C`, `800 #991B1B`, `900 #7F1D1D`, `950 #450A0A` |
| Green | `50 #EFFDF3`, `100 #D8FBE3`, `200 #B4F5CA`, `300 #82EAA8`, `400 #50D583`, `500 #36BE6D`, `600 #279D58`, `700 #237A46`, `800 #166238`, `900 #175030`, `950 #082D1A` |
| Orange | `50 #FFF7ED`, `100 #FFEDD5`, `200 #FED7AA`, `300 #FDBA74`, `400 #FB923C`, `500 #F97316`, `600 #EA580C`, `700 #C2410C`, `800 #9A3412`, `900 #7C2D12`, `950 #431407` |
| Purple | `50 #FAF5FF`, `100 #F3E8FF`, `200 #E9D5FF`, `300 #D8B4FE`, `400 #C084FC`, `500 #A855F7`, `600 #9333EA`, `700 #7E22CE`, `800 #6B21A8`, `900 #581C87`, `950 #3B0764` |
| Yellow | `50 #FEFCE8`, `100 #FEF9C3`, `200 #FEF08A`, `300 #FDE047`, `400 #FACC15`, `500 #E9C307`, `600 #C5A207`, `700 #A58609`, `800 #7F660A`, `900 #624F0E`, `950 #3D300B` |

### 3.3 Theme tokens

#### Primary and status

| Token | Reference | Resolved value |
| --- | --- | --- |
| `Primary/Normal` | `blue/600` | `#146EF5` |
| `Primary/Strong` | `blue/700` | `#1D4ED8` |
| `Primary/Heavy` | `blue/800` | `#1E40AF` |
| `Primary/Deep` | `blue/900` | `#1E3A8A` |
| `Status/success/600` | `green/600` | `#279D58` |
| `Status/danger/600` | `red/600` | `#DC2626` |
| `Status/warning/600` | `orange/600` | `#EA580C` |

Status 배경용 토큰은 같은 600 컬러에 `opacity/20` 또는 `opacity/10`을 합성한다.

- `Status/success/600-20`, `Status/danger/600-20`, `Status/warning/600-20`
- `Status/success/600-10`, `Status/danger/600-10`, `Status/warning/600-10`
- `opacity/10 = 10`, `opacity/20 = 20`; CSS에서는 각각 `0.1`, `0.2`로 해석한다.

#### Label

| Token | Reference | Resolved value |
| --- | --- | --- |
| `Label/Normal` | `gray/950` | `#111213` |
| `Label/Strong` | `gray/800` | `#36393C` |
| `Label/Neutral` | `gray/600` | `#6B7278` |
| `Label/Alternative` | `gray/450` | `#9EA5AB` |
| `Label/Soft` | `gray/400` | `#B6BBC0` |
| `Label/white` | `gray/white` | `#FFFFFF` |

#### Line

| Token | Reference | Resolved value |
| --- | --- | --- |
| `Line/Alternative` | `gray/50` | `#F7F7F8` |
| `Line/Neutral` | `gray/100` | `#F3F4F5` |
| `Line/Normal` | `gray/200` | `#ECEDEE` |
| `Line/Strong` | `gray/300` | `#CFD2D5` |
| `Line/Heavy` | `gray/450` | `#9EA5AB` |
| `Line/Intense` | `gray/600` | `#6B7278` |
| `Line/black` | `gray/800` | `#36393C` |
| `Line/White` | `gray/white` | `#FFFFFF` |

### 3.4 Color application

- 기본 본문과 제목은 `Label/*`, CTA와 상호작용 상태는 `Primary/*`, 구분선은 `Line/*`를 사용한다.
- 성공·오류·경고 의미는 각 `Status/*` 토큰으로만 표현한다. 의미가 없는 장식 컬러로 상태색을 사용하지 않는다.
- 같은 컴포넌트 상태에서 임의 hex나 임의 opacity를 추가하지 않는다.
- 현재 Figma에는 Local Paint Style이 없다. 구현 시 Paint Style 이름을 가정하지 않고 Variables를 직접 매핑한다.

## 4. Typography

### 4.1 Font

- 기본 한글·영문 폰트: `Pretendard`
- Figma에서 확인된 style: `Thin`, `ExtraLight`, `Light`, `Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`, `Black`
- 현재 시스템이 실제 사용하는 weight: `Regular`, `Medium`, `SemiBold`, `Bold`
- 웹 구현에서는 `/Users/veluga/.codex/assets/fonts/pretendard`의 `woff2`와 `pretendard.css`를 프로젝트 `public/assets` 아래로 복사해 self-hosting한다.
- 폰트 로딩 실패 시 임의의 한글 폰트로 조용히 대체하지 않는다. 로딩 상태를 확인하고 문제를 보고한다.

### 4.2 Text Style naming

- 이름 형식: `{Role}/{Size}-{Weight}`
- Weight suffix: `b = Bold`, `sb = SemiBold`, `m = Medium`, `r = Regular`
- Figma에는 Local Text Style 35개가 등록되어 있다.
- Local Paint, Effect, Grid Style은 각각 0개다.

### 4.3 Title styles

Title은 letter spacing `0%`, line height `140%`를 사용한다.

| Size | Styles |
| ---: | --- |
| 48px | `Title/48-b`, `Title/48-sb` |
| 40px | `Title/40-b`, `Title/40-sb` |
| 32px | `Title/32-b`, `Title/32-sb` |
| 28px | `Title/28-b`, `Title/28-sb` |
| 26px | `Title/26-b`, `Title/26-sb` |

### 4.4 Body styles

Body는 letter spacing `-0.5%`를 사용한다.

| Size | Line height | Styles |
| ---: | ---: | --- |
| 24px | 150% | `Body/24-b`, `Body/24-sb`, `Body/24-m` |
| 22px | 150% | `Body/22-b`, `Body/22-sb`, `Body/22-m` |
| 20px | 150% | `Body/20-b`, `Body/20-sb`, `Body/20-m` |
| 18px | 150% | `Body/18-b`, `Body/18-sb`, `Body/18-m` |
| 16px | 160% | `Body/16-b`, `Body/16-sb`, `Body/16-m` |
| 14px | 160% | `Body/14-b`, `Body/14-sb`, `Body/14-m`, `Body/14-r` |
| 13px | 160% | `Body/13-sb`, `Body/13-m`, `Body/13-r` |
| 12px | 160% | `Body/12-sb`, `Body/12-m`, `Body/12-r` |

- 본문은 `Regular` 또는 `Medium`, 강조는 `SemiBold`, 중요한 제목은 `Bold`를 우선한다.
- `13px`은 타이포그래피의 등록된 예외다. 공간 배수 규칙 때문에 `12px` 또는 `14px`로 바꾸지 않는다.
- 줄바꿈 문제를 폰트 크기 축소로 해결하지 않는다. 문구, 텍스트 폭, 레이아웃 순서로 조정한다.

## 5. Components

Footer 관련 컴포넌트와 예시는 이 문서에서 제외한다.

### 5.1 Logo

| Component | Variant | Size | Color variable |
| --- | --- | ---: | --- |
| `logo` | `black` | 88 × 26 | `gray/950` |
| `logo` | `white` | 88 × 26 | `gray/white` |

- 로고 비율과 내부 벡터를 수정하지 않는다.
- 밝은 배경에는 `black`, 어두운 배경에는 `white`를 사용한다.

### 5.2 GNB

| Variant | Frame | Inner content | Header height |
| --- | ---: | ---: | ---: |
| `device=D` | 1920px | 1440 × 40 | 68px |
| `device=T` | 744px | 696 × 40 | 68px |
| `device=M` | 390px | 358 × 36 | 54px |

- GNB 내부 폭은 Layout Grid content width와 동일하게 맞춘다.
- Desktop/Tablet과 Mobile의 높이 차이는 기존 Variant를 유지한다.

### 5.3 Text buttons

#### Component sets

| Component set | Type | Size | State | Variants |
| --- | --- | --- | --- | ---: |
| `btn_solid` | `solid`, `neutral`, `neutral_weak` | `32`, `36`, `40`, `44`, `48` | `default`, `hovered`, `pressed`, `disabled` | 60 |
| `btn_line` | `brand`, `neutral`, `ghost` | `32`, `36`, `40`, `44`, `48` | `default`, `hovered`, `pressed`, `disabled` | 60 |

Figma의 버튼 안내 레이블에는 `focused`가 적혀 있지만 실제 Component Variant에는 `focused`가 없고 `disabled`가 있다. 구현은 실제 Variant를 기준으로 하며, 키보드 focus-visible 상태는 별도 접근성 규칙으로 보강한다.

#### Size contract

| Size | Height | Horizontal padding | Gap | Radius | Label |
| ---: | ---: | ---: | ---: | ---: | --- |
| 32 | 32px | 12px | 6px | 8px | 14 Medium |
| 36 | 36px | 14px | 6px | 8px | 14 SemiBold |
| 40 | 40px | 16px | 8px | 8px | 14 SemiBold |
| 44 | 44px | 18px | 8px | 10px | 14 SemiBold |
| 48 | 48px | 20px | 8px | 10px | 16 SemiBold |

- Figma 예시의 폭 `64, 72, 80, 88, 96px`는 “버튼” 샘플 문구 기준이다.
- 실제 웹 버튼 폭은 label과 icon을 포함해 Hug Content로 늘어나며, 높이·padding·gap·radius 규칙을 유지한다.
- 모든 관련 요소는 가로 Auto Layout/Flex로 묶고 세로 중앙 정렬한다.

#### State colors

| Type | Default | Hovered | Pressed | Disabled |
| --- | --- | --- | --- | --- |
| Solid brand | bg `Primary/Normal` | bg `Primary/Strong` | bg `Primary/Heavy` | Default + opacity 38% |
| Solid neutral | bg `gray/900` | bg `gray/800` | bg `gray/700` | Default + opacity 38% |
| Solid neutral weak | bg `gray/100` | bg `gray/200` | bg `gray/300` | Default + opacity 38% |
| Line brand | white + `Primary/Strong` line/text | `blue/50` bg | `blue/100` bg | Default + opacity 38% |
| Line neutral | transparent + `gray/300` line | `gray/100` bg | `gray/200` bg | Default + opacity 38% |
| Ghost | transparent | `gray/100` bg | `gray/200` bg | Default + opacity 38% |

- 브랜드/중립 Solid의 label은 `Label/white`다.
- Neutral weak, Line neutral, Ghost의 label은 `Label/Normal`이다.
- Outline stroke는 `1px`다.

### 5.4 Button with icon

`btn_icon`은 8개 Variant다.

- Type: `solid`, `neutral`
- State: `default`, `hovered`, `pressed`, `disabled`
- Size: `80 × 44px`
- Icon: `20 × 20px`
- Gap: `4px`
- Padding: top/right/bottom/left = `0/12/0/16px`
- Radius: `8px`
- Disabled: opacity `38%`

### 5.5 Icon button

`icon_btn`은 `default`, `hovered`, `pressed` 3개 Variant다.

- Button: `40 × 40px`
- Icon: `24 × 24px`
- Padding: `8px`
- Radius: `8px`
- Background: `gray/100` → `gray/200` → `gray/300`
- 현재 disabled Variant는 없다. 필요한 경우 임의 추가하지 않고 컴포넌트 시스템에 먼저 정의한다.

### 5.6 Icon sets

| Set | Size | Stroke | Variants |
| --- | ---: | ---: | --- |
| `16` | 16 × 16 | 1.5px | down, up, language, info |
| `20` | 20 × 20 | 1.5px | arrow_go, search, down, delete, checkbox_unselected, checkbox_selected, menu, `cancle` |
| `24` | 24 × 24 | 2px | check, down, up, left, right, arrow_go, close, plus, mail, checkbox_selected, checkbox_unselected, menu |
| `40` | 40 × 40 | 2.4px | 코딩 에이전트, 문서업무, 반복 업무, 메모리, 모델 연결, 시스템연결 |

- 아이콘 크기와 stroke는 세트 규격을 유지한다.
- `20` 세트의 `cancle`은 현재 Figma Variant 이름의 오탈자다. 코드 의미는 `cancel/close`로 취급하되 Figma 이름을 바꾸기 전까지 매핑을 명시한다.
- 아이콘만 있는 버튼에는 접근 가능한 이름을 제공한다.

## 6. Shape and interaction

- 컴포넌트에 등록된 기본 radius는 `8px`, 큰 버튼의 radius는 `10px`다.
- pill이 필요한 경우에만 `9999px`를 사용한다.
- 테두리는 기본 `1px`; 아이콘 stroke는 `1.5px`, `2px`, `2.4px` 세트 규격을 따른다.
- Hovered와 Pressed는 동일하게 처리하지 않는다. 위 상태 토큰을 각각 사용한다.
- Disabled는 클릭·포커스를 막고, Figma와 같은 전체 opacity `38%`를 적용한다.
- Figma에 없는 `focus-visible`은 웹 접근성을 위해 시각적으로 명확한 focus ring을 추가하되 기존 레이아웃 크기를 바꾸지 않도록 outline을 사용한다.

## 7. Responsive implementation

- Desktop: 12 columns, 1440px content container, 240px reference margin.
- Tablet: 8 columns, 24px side padding.
- Mobile: 4 columns, 16px side padding.
- 카드나 섹션의 열 수는 breakpoint 숫자보다 실제 콘텐츠 최소 폭을 기준으로 줄인다.
- GNB의 D/T/M Variant와 동일한 inner content width를 유지한다.
- 긴 영문과 다국어 문구에서 버튼과 내비 텍스트가 잘리지 않도록 고정 폭 대신 Hug/내용 기반 폭을 사용한다.

## 8. Source inconsistencies to preserve or fix deliberately

| Item | Visual annotation | Actual source | Project rule |
| --- | --- | --- | --- |
| Tablet content width | 680px | Variable 696px, frame 744px with 24px margins | 696px 사용 |
| Button state label | focused 표기 | disabled Variant가 있고 focused Variant는 없음 | Component Variant 우선, focus-visible은 웹에서 보강 |
| Styles | 화면에 컬러·그리드 가이드가 보임 | Local Paint/Effect/Grid Style은 0개 | 존재한다고 가정하지 않음 |

## 9. QA checklist

- [ ] Footer를 이번 구현 범위에서 제외했는가
- [ ] Desktop/Tablet/Mobile에서 12/8/4 column과 240/24/16px margin을 확인했는가
- [ ] Tablet content width를 696px로 사용했는가
- [ ] 새 간격과 컴포넌트 치수가 4px 또는 필요한 경우 2px 배수인가
- [ ] Pretendard가 실제 네트워크/로컬 파일로 로드되었는가
- [ ] 텍스트가 35개 등록 Style 중 적합한 역할을 따르는가
- [ ] 색이 Theme Variable 또는 명시된 Atomic reference와 일치하는가
- [ ] 버튼의 hover, pressed, disabled, focus-visible을 실제 브라우저에서 확인했는가
- [ ] 관련 요소가 Auto Layout/Flex/Grid로 묶였는가
- [ ] 텍스트 잘림, 겹침, 가로 스크롤, 레이아웃 이탈이 없는가
- [ ] 390px, 744px, 1920px 기준 화면을 실제 렌더링으로 비교했는가

## 10. Figma source map

| Area | Node ID |
| --- | --- |
| Assets page | `776:690` |
| Atomic color | `869:2207` |
| Theme color | `869:750` |
| Typography | `869:1150` |
| Buttons | `869:285` |
| Logo / Navi | `869:1723` |
| Icons | `917:2583` |
| Layout Grid | `917:2675` |

문서 갱신 시 위 노드의 Variables, Local Styles, Component properties, 실제 Layout Grid를 다시 조회하고 스크린샷으로 확인한다.
