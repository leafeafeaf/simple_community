
# 👨‍👩‍👦‍👦 Simple Community 👨‍👩‍👦‍👦 



[![code](https://img.shields.io/badge/Code-Vue.js-blue)](https://ko.vuejs.org/)
[![DBMS](https://img.shields.io/badge/DBMS-MySQL-orange)](https://www.mysql.com/downloads/)




> 커뮤니티 사이트 👉 https://rollingpaper.site/

## 메인화면
<div>
<img src="img/simple1.png" width="500" height="500"/>
</div>


## 📖 Description

심플한 게시판을 즐기세요!

친구들, 동료들과 함께 링크를 공유하여 글을 작성하세요!

댓글 작성과 좋아요를 눌러 친구들의 글에 반응하세요!

## :baby_chick: image

<p float="left">
    <img src="https://lh3.googleusercontent.com/iYHEwh2_Q6nIKS67eItV4AwIokeJDNe0ojtpWGqKpRyhaRlmCSmBcnkFNCmXbTkajKA=w2560-h1330-rw" width=200 />
    <img src="https://lh3.googleusercontent.com/xl0sqT6Jz1p9Gq9slw4VXRr-akf4v74b_k3QkZUMZPvYV37-e5LqTZcOjofof4Xyl48=w2560-h1330-rw" width=200 />
    <img src="https://lh3.googleusercontent.com/JqUUXWSgU0bhSBpOObERLvfUGE3eBnInmYvDMY3S2aAatyeFKLOifWnBLgZ0KLGbmA=w2560-h1330-rw" width=200 />
    <img src="https://lh3.googleusercontent.com/AdN5fkguQMSc4M6iVkAFONsuxZhOQaKE7TDzuhF56FgDLORAnBv8160W7vva4a6kFBg=w2560-h1330-rw" width=200 />
    <img src="https://lh3.googleusercontent.com/ruDvvtKehqGB_4PX7QBsUY2RLDe_v6g5FL-_XmC6SUGjKUQqa08Uy-DtsNi8wYuuXU4=w2560-h1330-rw" width=200 />
</p>

## ⭐ Main Feature
### 정기 결제 기능
- 아임포트(Iamport)를 이용한 정기 결제 기능 구현

### 회원가입 및 로그인 
- JWT 이용

### 기타 기능
- 상품 리스트 조회 및 세부 사항 조회
- 마이페이지

## 💻 Getting Started
(↑해당 프로젝트 설치 및 실행 방법)

### Installation
```
npm install
```
### Develop Mode
```
npm run dev
```
### Production
```
npm run build
```

## 🔧 Stack
- **Language**: JavaScript
- **Library & Framework** : Node.js
- **Database** : AWS RDS (MariaDB)
- **ORM** : Sequelize
- **Deploy**: AWS EC2

## :open_file_folder: Project Structure

```markdown
src
├── common
│   ├── config
│   ├── types
│   └── utils
│       ├── types
│       └── utils
├── controller
├── entity
├── infrastructure
│   ├── express
│   └── typeorm
├── repository
└── ser
```

## 🔨 Server Architecture
(↑서버 아키텍처에 대한 내용을 그림으로 표현함으로써 인프라를 어떻게 구축했는 지 한 눈에 보여줄 수 있다.)
![](https://docs.aws.amazon.com/gamelift/latest/developerguide/images/realtime-whatis-architecture-vsd.png)

## ⚒ CI/CD
- github actions를 활용해서 지속적 통합 및 배포
- `feature` 브랜치에서 `dev`로 Pull Request를 보내면, CI가 동작된다.
- `dev`에서 `master`로 Pull Request를 보내면, CI가 동작되고 Merge가 되면, 운영 리소스에 배포된다.

## 👨‍💻 Role & Contribution

**Frontend (Web)**

- 관리자 페이지 (Vue.js) 개발
- 전체 아키텍처 구성

**Devops**

- CI/CD 구축 (Docker, Github Action)
- 서버 모니터링

**etc**

- 전체 개발 일정 및 이슈 관리

## 👨‍👩‍👧‍👦 Developer
*  **박재성** ([jaeseongDev](https://github.com/jaeseongDev))
*  **고성진** ([seongjin96](https://github.com/seongjin96))
*  **조연희** ([yeoneei](https://github.com/yeoneei))
