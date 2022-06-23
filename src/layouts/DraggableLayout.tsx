import { useMount } from "ahooks";
import {useRef} from "react";

// 原理 通过拖动draggable-line，计算偏移量
const DraggableLayout = (props: any) => {
  console.log(props.options.leftClassName,'props')
  const draggableDom123 = useRef(null)
  const contentDom123 = useRef(null)
  const drag = () => {
    const draggableDom: any = draggableDom123.current
    const contentDom: any = contentDom123.current
    const ref1: any = document.querySelector(`.${props.options.leftClassName}`);
    const ref2: any = document.querySelector(`.${props.options.rightClassName}`);
    draggableDom.onmousedown =
      (e: any) => {
        let _e = e;
        const dir = "horizontal"; // 设置好方向 可通过变量控制默认水平方向 horizontal | vertical
        const firstX = _e.clientX; // 获取第一次点击的横坐标
        const width: number = ref2.offsetWidth; // 获取到元素的宽度

        // 移动过程中对左右元素宽度计算赋值
        document.onmousemove =
          (_event: any) => {
            _e = _event;
            const moveOffset: number = _e.clientX - firstX;
            // 可扩展上下拖动等
            switch (dir) {
              case "horizontal":
                console.log(contentDom.offsetWidth, width, firstX);

                // @ts-ignore
                const baifenbi1 = (
                  // @ts-ignore
                  `${contentDom.offsetWidth - 15 - width + moveOffset}` / (
                    contentDom.offsetWidth - 10
                  )
                ) * 100;
                // @ts-ignore
                const baifenbi2 = (
                  (width - moveOffset + 5) / (contentDom.offsetWidth - 10)
                ) * 100;

                ref1.style.width = `calc(${baifenbi1}% - 5px)`;
                ref2.style.width = `calc(${baifenbi2}% - 5px)`;
                break;
              default:
                break;
            }
          };
        // 在左侧和右侧元素父容器上绑定松开鼠标解绑拖拽事件
        contentDom.onmouseup =
          () => {
            document.onmousemove = null;
          };
        return false;
      };
  };

  useMount(() => {
    drag();
  },);

  return <div ref={contentDom123} className={'draggable-layout'}>
    {props.children[0]}
    <div ref={draggableDom123} className={'draggable-line'}><div></div></div>
    {props.children[1]}
  </div>;
};

export default DraggableLayout;
