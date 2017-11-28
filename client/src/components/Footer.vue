<template>
  <footer class="footer">
    <div class="ui inverted">
      <p>Kopiitemtehmanis &copy; 2017</p>
    </div>
  </footer>
</template>

<script>
  export default {
    methods: {
      footerAlign: function() {
        $('footer').css('display', 'block');
        $('footer').css('height', 'auto');
        var footerHeight = $('footer').outerHeight();
        $('body').css('padding-bottom', footerHeight);
        $('footer').css('height', footerHeight);
      }
    },
    mounted () {
      this.footerAlign()
    }
  }
</script>
