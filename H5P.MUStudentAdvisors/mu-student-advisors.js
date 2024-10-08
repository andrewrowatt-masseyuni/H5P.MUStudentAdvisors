var H5P = H5P || {};
 
H5P.MUStudentAdvisors = (function ($) {
  /**
   * Constructor function.
   */
  function C(options, id) {
    this.options = options;
    this.id = id;
  };
 
  /**
   * Attach function called by H5P framework to insert H5P content into
   * page
   *
   * @param {jQuery} $container
   */
  C.prototype.attach = function ($container) {
    $container.addClass("h5p-studentadvisors");

	if(this.options.layout == '2') {
		$container.addClass("h5p-studentadvisors-twocol");
	} else if (this.options.layout == '3') {
		$container.addClass("h5p-studentadvisors-threecol");
	} else if (this.options.layout == '4') {
		$container.addClass("h5p-studentadvisors-fourcol");
	} else if((this.options.layout === undefined || this.options.layout == 'auto') && this.options.studentadvisors.length<=4) {
		$container.addClass("h5p-studentadvisors-twocol");
	}
	else {
		$container.addClass("h5p-studentadvisors-threecol");
	}

	$container.addClass(`h5p-studentadvisors-optionset-${this.options.optionset} h5p-studentadvisors-colourset-${this.options.colourset}`);

	var officehours = 'Office Hours';
	if(this.options.optionset == 'coca1') {
		officehours = 'Open Hours';
	}

	for(studentadvisor of this.options.studentadvisors) {
		var html = '<div class="studentadvisor">';
		
		if (studentadvisor.image && studentadvisor.image.path) {
			html += '<div class="profile-image" style="xbackground-image: url(' +  H5P.getPath(studentadvisor.image.path, this.id) + ')"><img alt="' + studentadvisor.name + '" src="' + H5P.getPath(studentadvisor.image.path, this.id) + '">';
		} else {
			html += '<div class="profile-image"><img alt="" src="data:image/jpeg;base64,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">';
		}
		
		html += '</div><div class="studentadvisor-item name-text">' + studentadvisor.name + '</div>';
		/* Optional item */
		if(studentadvisor.iwi) html += '<div class="studentadvisor-item iwi-text">' + studentadvisor.iwi + '</div>'
		
		html += '<div class="studentadvisor-item role-text">' + studentadvisor.role + '</div>'
		
		/* Optional items */
		if(studentadvisor.email) html += '<div class="studentadvisor-item email-text studentadvisor-item-icon"><a href="mailto:' + studentadvisor.email + '">' + studentadvisor.email + '</a></div>';
		if(studentadvisor.about) html += '<hr /><div class="studentadvisor-item about-text studentadvisor-item-icon">' + studentadvisor.about + '</div>';
		
		if(studentadvisor.link) html += '<div class="link-text"><a title="Click for more information" target="_blank" href="' + studentadvisor.link + '">More...</a></div>';

		html += '</div>';

		$container.append(html);
	}
  };
 
  return C;
})(H5P.jQuery);