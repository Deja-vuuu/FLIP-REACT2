import React, {Component} from 'react';
import 'web-animations-js';
import './App.scss'
let activeList = null
let SISTERS = [
  "https://pic3.zhimg.com/v2-89735fee10045d51693f1f74369aaa46_r.jpg",
  "https://pic1.zhimg.com/v2-ca51a8ce18f507b2502c4d495a217fa0_r.jpg",
  "https://pic1.zhimg.com/v2-c90799771ed8469608f326698113e34c_r.jpg",
  "https://pic1.zhimg.com/v2-8d3dd83f3a419964687a028de653f8d8_r.jpg",
  "https://pic1.zhimg.com/v2-09eefac19ac282684f60a202aa9abb2c_r.jpg",
  "https://pic3.zhimg.com/v2-a7340ebca1f7a4f65190583b4ab3a482_r.jpg",
  "https://pic2.zhimg.com/v2-37860484a1a73257178e95267c7db641_r.jpg",
  "https://pic2.zhimg.com/v2-7fc30291c807d07d2d26c5a8ffdd3b89_r.jpg",
  "https://pic4.zhimg.com/v2-02efe89495be4f68f6b7b6c510da36cf_r.jpg",
  "https://pic3.zhimg.com/v2-1e375cbcad7ae119c34a1357c9e8f182_r.jpg",
  "https://pic4.zhimg.com/v2-aeadbc3d02af2631e3a7acd0dc72b01b_r.jpg",
  "https://pic3.zhimg.com/v2-a47effc7163387c1ad7ccfc90ec3e91e_r.jpg",
  "https://pic3.zhimg.com/v2-a71fad6a1fee2614ad95a4bae0376eb6_r.jpg",
  "https://pic3.zhimg.com/v2-861f71f28e361237003aa1c88188f326_r.jpg",
  "https://pic4.zhimg.com/v2-525c8002eb619387e7a31f67169f8a2b_r.jpg",
  "https://pic4.zhimg.com/v2-0dcbcf5a48a97afab7439e09af65c98f_r.jpg",
  "https://pic1.zhimg.com/v2-d640737ff5eac65fe30375f324512d00_r.jpg",
  "https://pic1.zhimg.com/v2-6e92b4576b93302ad5fe04c7e95e375c_r.jpg",
  "https://pic1.zhimg.com/v2-5e4a1221996179cbacc5d7450d25f908_r.jpg",
  "https://pic3.zhimg.com/v2-7f58a7d6e8b1ed3f653a96ae9d6e1e2e_r.jpg",
  "https://pic4.zhimg.com/v2-fb767fd3f56591a3c4b2b4089c47776f_r.jpg",
  "https://pic2.zhimg.com/v2-6b9847e11d3a8cac8ac0ef52bffd9af5_r.jpg",
  "https://pic2.zhimg.com/v2-6f2119f99200fc61abc246eea36f25b1_r.jpg",
  "https://pic4.zhimg.com/v2-2103acaf025ceda331a0dd59022443ab_r.jpg",
  "https://pic2.zhimg.com/v2-edc1b118c420939c545b1449344139b5_r.jpg",
  "https://pic2.zhimg.com/v2-d94530f491f23c61659ef458ac8a9db5_r.jpg",
  "https://pic2.zhimg.com/v2-ff15820a9c1cb8e2bb0af1048ea81145_r.jpg",
  "https://pic4.zhimg.com/v2-a8fb0a1d8581e4bfce905791271711c7_r.jpg",
  "https://pic2.zhimg.com/v2-1008cd2c72129809cc348cdc04310475_r.jpg",
]
export default class FLIP extends Component {

  listRef= React.createRef();
  activeCardList =[]

  state = {
    initCardNum: 4,
    cardList: [],
    animateStatus: 0
  }
  index = 0
  creatCardList =(num=2)=>{
    return Array(num).fill('').map((item, index) => ({
      index
    }))
  }
  // 生成一个二维数组
  getArrByLen=(len) => {
    return Array(len).fill('').map(() => {
      return {
        left: 0,
        top:0,
        index: this.index++
      }
    });
  }
  /**
   * 新增卡片
   * @param num 新增卡片数量 默认新增一个
   */
  add = (num = 1)=>{
    let  {cardList} = this.state;
    let cardListRef = this.listRef.current;
    let currentCardList = Array.prototype.slice.call(cardListRef.children);
    this.transArr = this.getArrByLen(currentCardList.length);

    console.log('currentCardList',currentCardList)
    let newCardList= this.createRectMap(currentCardList)
    // let addList = this.getArrByLen(num)
    // let newCardList = cardList.concat(addList)
    // this.addNum = num
    this.setState(
        {
          cardList:newCardList,
          animateStatus: 1,
        }
    );
  }
  createRectMap=(imgs)=> {
    return imgs.reduce((prev, cur,idx) => {
      const rect = cur.getBoundingClientRect()
      const { left, top } = rect
      prev[idx] = { left, top }
      return prev
    }, {})
  }
  /**
   * 删除卡片
   * @param delIndex 删除卡片的索引
   */
  del = (delIndex)=>{
    let  {cardList} = this.state;
    let cardListRef = this.listRef.current;
    let currentCardList = Array.prototype.slice.call(cardListRef.children)
    console.log('currentCardList1',currentCardList)
    let activeCardList = Array.prototype.slice.call(cardListRef.children).slice(delIndex + 1)
    console.log('activeCardList',activeCardList)
    this.transArr = this.getArrByLen(activeCardList.length + 1);
    console.log(' this.transArr', this.transArr)
    activeCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index].left = rectInfo.left;
      this.transArr[index].top = rectInfo.top;
    });
    console.log('cardList')
    let newCardList = cardList.filter((value, index) => index !== delIndex)
    this.delIndex = delIndex
    console.log('cardList')
    this.setState(
        {
          cardList:newCardList,
          animateStatus: 2,
        }
    );
  }
  a = ()=>{
    let {cardList} = this.state;
    let cardListRef = this.listRef.current;
    let currentCardList = Array.prototype.slice.call(cardListRef.children);
    this.transArr = this.getArrByLen(currentCardList.length);
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index].left = rectInfo.left;
      this.transArr[index].top = rectInfo.top;
    });
    console.log('乱序',this.transArr)
    let newCardList = this.shuffle(cardList)
    this.transArr = this.shuffle(this.transArr)
    console.log('newCardList',newCardList)
    this.setState(
        {
          cardList: newCardList,
          animateStatus: 3,
        }
    );

  }
  // by ustbhuangyi
  shuffle = (arr) => {
    let getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let ret = arr.slice()
    for (let i = 0; i < ret.length; i++) {
      let j = getRandomInt(0, i)
      let t = ret[i]
      ret[i] = ret[j]
      ret[j] = t
    }
    return ret
  }

  componentDidUpdate(prevProps, prevState){
    const {animateStatus} = this.state;
    const currentCardList = Array.prototype.slice.call(this.listRef.current.children);
    if (animateStatus){
      console.log('currentCardList2',currentCardList)
      let activeCardList=[];
      // 位置需要进行改变的节点（可以大致认为位于当前变化节点之前的所有节点，位置完全不变）
      switch (animateStatus){
        case 1:
          activeCardList = currentCardList.slice(this.addNum)
          break;
        case 2:
          activeCardList = currentCardList.slice(this.delIndex)
          break;
        case 3:
          activeCardList = currentCardList.slice()
          break;
        default:
          break;
      }
      activeCardList.forEach((value, index) => {
        let rectInfo = value.getBoundingClientRect();
        console.log(rectInfo.left, rectInfo.top)
        let invertLeft = this.transArr[index].left - rectInfo.left
        let invertTop = this.transArr[index].top - rectInfo.top
        const keyframes = [
          {
            transform: `translate(${invertLeft}px, ${invertTop}px)`,
          },
          { transform: "translate(0)" },
        ]
        const options = {
          duration: 1000,
          easing: "cubic-bezier(0,0,0.32,1)",
        }
        value.animate(keyframes, options)
      });
    }
  }
  componentDidMount() {
    let cardList = this.creatCardList(this.state.initCardNum);
    this.setState(
        {
          cardList:cardList
        },()=>{
          // this.add(2)
        }
    );
  }

  render() {
    console.log('render,')
    let { cardList } = this.state;
    return <div className='page'>
      <div onClick={()=>{
        this.add(1)
      }}>
        新增
      </div>
      <div onClick={()=>{
        this.a(2)
      }}>
        乱序
      </div>
      <div className='card-container' ref={this.listRef}>
        {
          cardList.map((value,index)=>{
            return  <div className='card-item' id={index} key={index} style={{
              zIndex: index
            }}
            onClick={()=>{
              this.del(index)
            }}
            >
              <div className='title'>
                {
                  cardList[index].index
                }
              </div>
              <img src={SISTERS[index]} alt=""/>
            </div>
          })
        }
      </div>
    </div>
  }
}