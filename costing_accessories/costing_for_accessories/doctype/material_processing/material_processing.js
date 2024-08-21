// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Material Processing", {
	refresh(frm) {
        // msgprint("Refresh");
	},

    onload_post_render: function(frm) {
        frm.get_field("detail").$input.addClass("btn-primary");
    },

});
