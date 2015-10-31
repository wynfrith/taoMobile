<div class="{{scoped}}">
  <div class="modal-mask" v-transition="modal"
    style="opacity:{{show? '100': '0'}} ;
           z-index:{{show? '9999': '-1'}}"
    >
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          {{date.year}}年{{date.month}}月{{date.day}}日周{{week}}
        </div>
        <div class="modal-body">
          <div class="swiper">
            <div class="swiper-year swiper-container">
              <div class="swiper-wrapper">
              </div>
              <button class="prev-y prev"></button>
              <button class="next-y next"></button>
            </div>
          </div>
          <div class="swiper">
            <div class="swiper-month swiper-container">
              <div class="swiper-wrapper">
              </div>
              <button class="prev-m prev"></button>
              <button class="next-m next"></button>
            </div>
          </div>
          <div class="swiper">
            <div class="swiper-day swiper-container">
              <div class="swiper-wrapper">
              </div>
              <button class="prev-d prev"></button>
              <button class="next-d next"></button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on="click:cancel()">取消</button>
          <button v-on="click:clear()">清除</button>
          <button v-on="click:ok()">确定</button>
        </div>

      </div>
    </div>
  </div>
  <!-- <div class="swiper-year swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">2014</div>
    </div>
    <button class="prev"></button>
    <button class="next"></button>
  </div> -->
</div>
