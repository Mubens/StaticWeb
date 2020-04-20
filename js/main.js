$(function () {
  let navs = $('.nav-bar>a')
  let dots = $('.dot-bar>i')
  let wrappers = $('.wrapper')
  let index = 0
  let flag = true

  for (let i = 0; i < navs.length; i++) {
    navs.eq(i).attr('data-index', i)
    dots.eq(i).attr('data-index', i)
    wrappers.eq(i).attr('data-index', i)
  }

  function indecChange() {
    wrappers.eq(index).css('display', 'block').siblings('.wrapper').css('display', 'none')
    navs.eq(index).addClass('current').siblings("a").removeClass('current')
    dots.eq(index).addClass('current').siblings("i").removeClass('current')
    wrappers.eq(index).children(".content").children("h4").addClass('visited')
    setTimeout(() => {
      wrappers.eq(index).children(".content").children("h4").removeClass('unvisited')
    }, 500)
  }

  navs.on('click', function () {
    index = $(this).attr('data-index')
    indecChange()
  })

  dots.on('click', function () {
    index = $(this).attr('data-index')
    indecChange()
  })

  var wintop = 0
  let scoHeight = 0
  // $(window).on('scroll', () => {
  //   let winHeight = $(window).height(); // 可视窗口的高度
  //   let docHeight = $(document).height()
  //   wintop = Math.floor($(window).scrollTop()); // 已滚动卷去的高度
  //   scoHeight = Math.floor(docHeight - winHeight)
  //   // console.log(wintop, scoHeight);

  // })
  $(document).on("mousewheel DOMMouseScroll", function (e) {
    let delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
      (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    let winHeight = $(window).height(); // 可视窗口的高度
    let docHeight = $(document).height()
    wintop = Math.floor($(window).scrollTop()); // 已滚动卷去的高度
    scoHeight = Math.floor(docHeight - winHeight)
    // console.log(wintop, scoHeight);
    if (flag) {
      flag = false
      if (delta > 0 && wintop === 0) {
        index = --index < 0 ? 0 : index
      } else if (delta < 0 && wintop === scoHeight) {
        index = ++index > navs.length - 1 ? navs.length - 1 : index
        if (index !== navs.length - 1) {
          $(document).scrollTop(0)
        }
      }
      indecChange()
      setTimeout(() => flag = true, 500)
    }
  })
})