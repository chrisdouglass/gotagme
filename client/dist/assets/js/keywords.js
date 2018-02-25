var keywords = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: 'assets/js/keywords.json?nocache=' + (new Date()).getTime(),
    filter: function(list) {
      return $.map(list, function(keyword) {
        return { name: keyword }; });
    }
  }
});
keywords.initialize();

/**
 * Typeahead
 */
var elt = $('input.form-keywords');
elt.tagsinput({
  typeaheadjs: {
    name: 'keywords',
    displayKey: 'name',
    valueKey: 'name',
    source: keywords.ttAdapter()
  }
});


// HACK: overrule hardcoded display inline-block of typeahead.js
$(".twitter-typeahead").css('display', 'inline');