import React, {Component} from 'react';
import 'web-animations-js';
import './App.scss'
let activeList = null
export default class FLIP extends Component {

  listRef= React.createRef();
  activeCardList =[]

  state = {
    initCardNum: 4,
    cardList: [],
    animateStatus: 0
  }
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
        top:0
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
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      this.transArr[index].left = rectInfo.left;
      this.transArr[index].top = rectInfo.top;
    });
    let addList = this.getArrByLen(num)
    let newCardList = cardList.concat(addList)
    this.addNum = num
    this.setState(
        {
          cardList:newCardList,
          animateStatus: 1,
        }
    );
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
    let newCardList = cardList.filter((value, index) => index !== delIndex)
    this.delIndex = delIndex
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
    let newCardList = this.shuffle(currentCardList)
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
    const {animateStatus,cardList} = this.state;
    const currentCardList = Array.prototype.slice.call(this.listRef.current.children);
    console.log('componentDidUpdate',cardList)
    console.log('componentDidUpdate',currentCardList)
    currentCardList.forEach((value, index) => {
      let rectInfo = value.getBoundingClientRect();
      console.log(rectInfo.left, rectInfo.top)
    });
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
                  index
                }
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}