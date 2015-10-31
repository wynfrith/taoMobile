<div class="{{scoped}}">
  <div class="modal-mask" v-show="show" v-transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <content select=".modal-header">
          <div class="modal-header" v-text="title">
          </div>
        </content>
        <content select=".modal-body">
          <div class="modal-body">
            <textarea v-model="text" v-validate="required,maxLength:length" autofocus></textarea>
          </div>
        </content>
        <content select=".modal-error">
          <div class="modal-error">
            <span v-if="validation.text.maxLength">{{title}}应该不多于{{length}}个字</span>
          </div>
        </content>
        <content select=".modal-footer">
          <div class="modal-footer">
            <button class="modal-default-button"
              v-on="click: show = false" v-attr="disabled:validation.text.maxLength">
              完成
            </button>
            <button class="modal-default-button cancel-btn"
              v-on="click: cancel()">
              取消
            </button>
          </div>
        </content>
      </div>
    </div>
  </div>
</div>
