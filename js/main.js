$(function () {
  let topnav = $('header nav a')
  let sidenav = $('aside ol li')
  let togs = $('.tog')
  let footer = $('footer')
  let navLen = topnav.length
  let index = 0

  const contentTops = new Array(navLen)

  contentTops[0] = 0
  for (let i = 0; i < navLen; i++) {
    topnav.eq(i).attr('data-index', i)
    sidenav.eq(i).attr('data-index', i)
  }

  // 锚点导航
  function indecChange() {
    togs.eq(index).css('display', 'block').siblings('.tog').css('display', 'none')
    topnav.eq(index).addClass('current').siblings("a").removeClass('current')
    sidenav.eq(index).addClass('current').siblings("li").removeClass('current')
    togs.eq(index).children("h4").addClass('visited')
    if (index === navLen - 1) {
      footer.css('display', 'block')
    } else {
      footer.css('display', 'none')
    }
    setTimeout(() => {
      togs.eq(index).children("h4").removeClass('unvisited')
    }, 500)
  }

  topnav.on('click', function (e) {
    e.preventDefault();
    index = $(this).attr('data-index')
    indecChange()
  })

  sidenav.on('click', function (e) {
    e.preventDefault();
    index = $(this).attr('data-index')
    indecChange()
  })

  let flag = true // 切换阀，防止切换过快
  let flag2 = false // 切换阀，防止误触切换
  let timer = null
  $(window).on("mousewheel DOMMouseScroll", function (e) {
    let delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
      (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    // 如果没有滚动条
    if (document.documentElement.clientHeight >= document.documentElement.offsetHeight) {
      if (flag) {
        flag = false
        if (delta > 0) {
          // alert('上滚')
          index = --index < 0 ? 0 : index
        } else if (delta < 0 && index !== navLen - 1) {
          index = ++index > navLen - 1 ? navLen - 1 : index
        }
        indecChange()
        setTimeout(() => flag = true, 800)
      }
      // flag2 = false
    } else {
      if (flag) {
        flag = false
        let winHeight = $(window).height(); // 可视窗口的高度
        let docHeight = $(document).height()
        wintop = Math.ceil($(window).scrollTop()); // 已滚动卷去的高度
        scoHeight = Math.ceil(docHeight - winHeight)
        if (delta > 0 && wintop === 0) {
          // if (flag2) {
          index = --index < 0 ? 0 : index
          //   flag2 = false
          // }
          // flag2 = true
        } else if (delta < 0 && wintop === scoHeight && index !== navLen - 1) {
          // if (flag2) {
          index = ++index > navLen - 1 ? navLen - 1 : index
          $('html').scrollTop(0)
          //   flag2 = false
          // }
          // flag2 = true
        }
        indecChange()
        setTimeout(() => flag = true, 800)
      }
    }
  })
})
