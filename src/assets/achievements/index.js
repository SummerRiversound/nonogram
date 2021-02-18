
export default [
        {
            name: {
                kr:"처음만 힘들지",
                en:"X",
            },
            detail: '처음 스테이지 클리어',
            func: () => true
        },
        {
            name: {
                kr:"5x5는 누워서 떡먹기잖아?",
                en:"X",
            },
            detail: '5X5 스테이지 모두 클리어',
            func: stagesStatus=> stagesStatus[5].every(value=>value==true)
        },
        {
            name: {
                kr:"10x10은 땅 짚고 헤엄치기인걸",
                en:"X",
            },
            detail: '10X10 스테이지 모두 클리어',
            func: stagesStatus=> stagesStatus[10].every(value=>value==true)
        },
        {
            name: {
                kr:"그래 15x15는 되야 푸는 맛이 나지",
                en:"X",
            },
            detail: '15X15 스테이지 모두 클리어',
            func: stagesStatus=> stagesStatus[15].every(value=>value==true)
        },
        {
            name: {
                kr:"시간이 너무 모잘라요..",
                en:"X",
            },
            detail: '정해진 시간 초과',
            func: ()=>true
        },
        {
            name: {
                kr:"게임 켜놓고 까먹으신거 아니죠?",
                en:"X",
            },
            detail: '한 스테이지에서 한시간 경과',
            func: () =>true
    },
                {
            name: {
                kr: "여기엔 뭐가 있을까?",
                en: "X",
            },
            detail: 'Achievements 페이지 처음 방문',
            func: () => true
        },
        {
            name: {
                kr: "저에요! 제가 만들었어요!",
                en: "X",
            },
            detail: '게임 제작자 이름 확인',
            func: () => true
        },
    ]