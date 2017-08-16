function movehome(){
  location.href = "/";
}

function fileInfo(f) {
  var file = f.files;

  // if(file[0].size > 1024 * 1024){
  //   alert('1MB 이상의 파일은 안됩니다.');
  //   return;
  // }else if(file[0].type.indexOf('image')<0){
  //   alert('이미지 파일만 선택하세요.');
  // }

  var reader = new FileReader();

  reader.onload = function(rst) {
    $('#posters').remove();
    $('#box').append('<img style="width:243px;height:304px" src="'+rst.target.result+'">');
  }
  reader.readAsDataURL(file[0]);
}

$(function(){
  $('#box').on({
    'drop':function(e){
      var f = e.originalEvent.dataTransfer.files[0];
      var reader = new FileReader();
      $(reader).on('load', function () {
        $('#posters').attr('src',reader.result);
      });
      reader.readAsDataURL(f);
      e.preventDefault();
    },
    'dragover':function (e) {
      e.preventDefault();
    }
  });
});
