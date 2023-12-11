# **구글 설문조사 Clone**

## **Contents**

- [**구글 설문조사 Clone**](#구글-설문조사-Clone)
  - [**Contents**](#contents)
  - [**Requirements**](#requirements)
  - [**Tools**](#tools)
  - [**Environment Setting**](#environment-setting)
  - [**실행 방법**](#실행-방법)
  - [**Features**](#features)
  - [**Dependencies**](#dependencies)
  - [**TroubleShooting**](#troubleShooting)
  - [**Code Structure**](#code-structure)

## **Requirements**

1. Typescript : 4.9.t
2. Expo: 48.0.18
3. React : 18.2.0
4. React-Native: 0.71.8
5. Styled-Components: 5.3.11
6. Redux: 4.2.1
7. Redux-Persist: 6.0.0
8. Husky : 8.0.0
9. ESLint : 8.43.0
10. Prettier : 2.8.8

## **Tools**

| Tool          | Name                                                        |
| ------------- | ----------------------------------------------------------- |
| IDE           | Visual Studio Code                                          |
| Code Managing | [Github](https://github.com/gggongbo/classum-fe-assignment) |

## **Environment Setting**

```bash
#ubuntu 환경 기준으로 작성
sudo apt install nodejs #nodejs 설치
sudo apt install npm #npm 설치

yarn global add expo-cli | npm install --global expo-cli #expo 실행을 위한 cli 설치

#In project path
yarn | npm install #node_modules 설치
```

## **실행 방법**

```bash
yarn start | npm run start #구글 플레이스토어/앱스토어에서 Expo Go 앱 설치 후 bash창에 나타나는 큐알코드를 스캔하면 실제 기기에서 실행 가능
```

## **Features**

| Feature                      | Description                                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| 설문 제목 추가, 편집         | 상단 화면에서 설문 전체 제목 편집이 가능하고, 세부 설문 제목 추가, 편집 가능                              |
| 설문 설명 추가, 편집         | 상단 화면에서 설문 전체 설명 편집이 가능하고, 세부 설문 설명 추가, 편집 가능                              |
| 설문 추가                    | 하단 플로팅 버튼의 플러스를 눌러 세부 설문 설명 추가가 가능 가능                                          |
| 설문 수정                    | 수정하고 싶은 부분을 터치해서 설문 수정 가능                                                              |
| 설문 복사, 삭제              | 세부 설문 하단의 복사, 삭제 아이콘을 눌러 같은 내용의 세부 설문을 복사하거나 삭제 가능                    |
| 필수 옵션 설정               | 세부 설문 하단의 필수 스위치 버튼으로 필수 옵션 설정 가능                                                 |
| ActionSheet로 설문 유형 선택 | 단답형, 장문형, 객관식, 체크박스로 표기된 설문 유형을 터치하면 ActionSheet가 나타나며 설문 유형 수정 가능 |
| 미리보기                     | 하단 플로팅 버튼의 눈 모양 아이콘을 눌러 미리보기 가능                                                    |

## **Dependencies**

| Dependency                                                                        | Description                                                                                       |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| @expo/vector-icons , @react-native-material/core                                  | 아이콘 컴포넌트, 스위치 컴포넌트 등 UI 컴포넌트를 사용하기 위해 라이브러리 사용                   |
| @react-navigation/native, @react-navigation/native-stack, @react-navigation/stack | 스택 네비게이터로 화면 전환을 구현하기 위해 사용                                                  |
| @reduxjs/toolkit                                                                  | redux state 변경 및 관리를 위한 action, reducer를 slice 하나로 관리할 수 있어 사용                |
| react-redux, redux, redux-persist                                                 | 글로벌 state 관리를 위해 사용                                                                     |
| react-native-android-keyboard-adjust, react-native-keyboard-aware-scroll-view     | 안드로이드 환경에서 키보드 입력에 대응할 수 있는 컴포넌트를 만들기 위해 사용                      |
| react-native-gesture-handler                                                      | 네이티브 gesture를 관리하고 유연한 스크롤뷰 동작이 가능한 FlatList 등의 컴포넌트 이용을 위해 사용 |
| react-native-reanimated, reanimated-bottom-sheet                                  | ActionSheet 구현 및 ActionSheet 백드롭 동작에 애니메이션을 쓰기 위해 사용                         |
| react-native-safe-area-context, react-native-safearea-height                      | IOS, 안드로이드 기기 특성으로 화면이 가려지는 경우를 막기 위해 사용                               |
| styled-components                                                                 | tagged template literal 문법을 이용한 조건부 스타일링 적용하기 위해 사용                          |
| husky, lint-staged                                                                | git commit 시 소스 lint 및 typescript 컴파일을 진행하는 등의 소스 검사를 하기 위해 사용           |

## **TroubleShooting**

| Date         | Issue                                                                                                                                                                         | Description                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `2023-07-04` | `리스트가 많아졌을 때 스크롤이 느려지는 이슈, 키보드가 올라오면 해당 설문 아이템이 제대로 보여지지 않는 현상`                                                                 | `리스트 아이템에 키값 추가, KeyboardAvoidingView 공통 컴포넌트 생성하여 React-Native KeyboardAvoidingView와 KeyboardAwareScrollView를 상황에 따라 활용할 수 있도록 해서 조치 ` |
| `2023-07-04` | `리스트 아이템이 많을 때 미리보기 화면이 제대로 보여지지 않는 현상, 미리보기 화면에서 리스트 아이템 제목, 답변 옵션 잘려보이는 현상`                                          | `아이템을 감싸는 뷰의 css flex :1 속성 제거, 아이템 제목, 답변에 flex:1 속성 추가   `                                                                                          |
| `2023-07-04` | `설문 아이템 복사/생성 시, 기존 설문 아이템에 작성한 답변 옵션들이 안보이는 현상 `                                                                                            | `답변 옵션을 감싸는 뷰에 css flexGrow:0 속성 추가`                                                                                                                             |
| `2023-07-04` | `설문 아이템 타입을 객관식, 체크박스로 변경하면 옵션 1이 자동 생성되지 않는 현상, 객관식, 체크 박스 설문 아이템에 기타 답변 옵션을 추가하면 중간에 기타 답변이 위치하는 현상` | `설문 아이템 타입 변경 시 객관식과 체크박스가 아닌 타입에서 객관식, 체크박스로 변경하는지 확인 후 옵션 1 생성해주는 로직 추가, 기타 답변 옵션 관리 로직 추가`                  |
| `2023-07-04` | `설문 아이템 제목, 답변 옵션의 빈 값 처리 로직이 없음`                                                                                                                        | `빈 값 처리 로직 추가`                                                                                                                                                         |
| `2023-07-04` | `설문 아이템의 답변 옵션을 입력할 때, 한 글자 타이핑마다 매번 키보드가 내려가는 현상 `                                                                                        | `답변 옵션 입력시 리렌더링이 계속 발생하지 않도록 로직 변경`                                                                                                                   |
| 2023-06-28   | Styled-Component 사용시 커스텀 테마가 인식되지 않고, 타입 오류 나타나는 현상                                                                                                  | src/lib 폴더 생성 후 styled.d.ts 파일에 모듈 타입 재선언해서 해결                                                                                                              |
| 2023-06-28   | InnerScrollView 안에서 객관식/체크박스 설문 답변이 3개 이상이 될 때, 답변 리스트 전체가 위로 올라가는 현상                                                                    | 답변 컴포넌트의 css 속성에 flex:1을 제거해서 해결                                                                                                                              |
| 2023-06-28   | 하나의 TextInput 컴포넌트가 포커싱되면, 전체 TextInput 컴포넌트가 포커싱된 것으로 인식되고 포커싱 스타일이 적용되는 현상                                                      | 포커싱된 TextInput 컴포넌트를 unique하게 확인할 수 있도록 redux slice 구조 변경                                                                                                |
| 2023-06-28   | IOS에서 설문 리스트 스크롤이 안되는 현상                                                                                                                                      | KeyboardAwareScrollView의 children 컴포넌트 높이가 정해지지 않아 스크롤 불가 현상 발생, children 컴포넌트에 css height 속성 추가하여 해결                                      |
| 2023-06-28   | Android 키보드 입력시 화면에 키보드가 그대로 겹쳐보이는 현상                                                                                                                  | 키보드 입력이 감지될 시, 컴포넌트의 height을 줄여서 겹치는 영역이 없도록하여 해결                                                                                              |

## **Code Structure**

- **lib** : 외부 라이브러리 위치
- **theme**: light, dark 모드 관련 color 설정값 위치
- **index.jsx**
- **ui**
  - App.tsx
  - components : 아토믹 디자인 적용하여 공통 컴포넌트 작성
    - atom
      - KeyboardAvoidingView
    - molecule
      - Checkbox
      - TextInput
  - hooks
    - device
    - lifecycle
    - state
  - navigations
    - RootNavigator : App.tsx 하위 루트 네비게이터
    - AppNavigator : 설문 아이템 작성, 미리보기 스크린 간의 네비게이션 관리
  - features
    - preview : 설문 아이템 작성 스크린, 설문 아이템 작성 화면에서 이용하는 컴포넌트 위치
    - survey : 미리보기 스크린, 미리보기 화면에서 이용하는 컴포넌트 위치
  - store : redux store 설정 로직 위치
  - slices : redux toolkit slices(reducer+action) 로직 위치
