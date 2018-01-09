function contactAddress(name, domain){
  var domain = "webix.com";
  var name = "sales";
  eml = name + '@' + domain;
  document.write ('<a href="mailto:' + eml + '">' + eml + '</a>');
}
