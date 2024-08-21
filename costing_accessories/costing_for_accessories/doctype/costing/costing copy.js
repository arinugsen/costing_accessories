// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

// frappe.call(method, args)
// frappe.db.get_doc(doctype, name, filters)
// frappe.db.get_list(doctype, { fields, filters })
// frappe.db.get_value(doctype, name, fieldname)
// frappe.db.get_single_value(doctype, field)
// frappe.db.set_value(doctype, docname, fieldname, value, callback)
// frappe.db.insert(doc)
// frappe.db.count(doctype, filters)
// frappe.db.delete_doc(doctype, name)
// frappe.db.exists(doctype, name)

frappe.ui.form.on("Costing", {
	refresh(frm) {
        frm.set_value("date", frappe.datetime.nowdate())
        frm.set_value("classification", "Fabric")
	},

    buyer_specification(frm) {

        var bs = frm.doc.buyer_specification
        var sr1, sr2, no1, no2
        frappe.db.get_value('Buyer Specification', bs, ['size_range_1', 'size_range_2'])
            .then(r => {
                var value = r.message
                console.log(value)

                sr1 = value.size_range_1
                sr2 = value.size_range_2

                frappe.db.get_value('Size', sr1, 'no')
                    .then(r => {
                        var value = r.message
                        console.log(value)
                        no1 = value.no

                        frappe.db.get_value('Size', sr2, 'no')
                            .then(r => {
                                var value = r.message
                                console.log(value)
                                no2 = value.no

                                // for (var i=no1; i<=no2; i++){

                                // }
                                
                                // frappe.db.get_value('Raw Material Consumption', {size:sr2}, 'qty_foam_cup_per_m_prs')
                                //     .then(r => {
                                //         console.log(r.message.qty_foam_cup_per_m_prs) 
                                //     })

                                frappe.call({
                                    method:
                                        "costing_accessories.costing_for_accessories.doctype.costing.costing.get_pairs_meter",
                                    type: "GET",
                                    args: {
                                        sr1: sr1,
                                        sr2: sr2,
                                        no1: no1,
                                        no2: no2
                                    },
                                    callback: function(r) {
                                        if (r.message) {
                                            var value = r.message
                                            console.log(value)

                                            var qty_foam_cup_per_m_prs = value
                                            var qty_foam_cup_per_m_prs_ = qty_foam_cup_per_m_prs.toFixed(1)
                                            var qty_foam_cup_per_m_prs_arr = qty_foam_cup_per_m_prs_.toString().split(".")
                                            console.log(qty_foam_cup_per_m_prs_)
                                            
                                            var qty_foam_cup_per_m_prs_fix
                                            if (0<=Number.parseInt(qty_foam_cup_per_m_prs_arr[1]) && Number.parseInt(qty_foam_cup_per_m_prs_arr[1])<=4) {
                                                qty_foam_cup_per_m_prs_fix = qty_foam_cup_per_m_prs_arr[0]
                                            } else if (5<=Number.parseInt(qty_foam_cup_per_m_prs_arr[1]) && Number.parseInt(qty_foam_cup_per_m_prs_arr[1])<=9) {
                                                qty_foam_cup_per_m_prs_fix = qty_foam_cup_per_m_prs_arr[0]+".5"
                                            }

                                            frm.set_value("pairs_per_meter", qty_foam_cup_per_m_prs_fix)

                                        }
                                    },
                                    error: (r) => {
                                        // on error
                                    }
                                });


                                // frappe.db.get_list('Size', {
                                //     fields: ['no', 'size'],
                                //     filters: {
                                //         no: '2'
                                //     }
                                // }).then(records => {
                                //     console.log(records);
                                // })


                            })

                    })
            })


        // frappe.db.get_value('Size', sr2, 'no')
        //     .then(r => {
        //         console.log(r.message)
        //     })

        // frappe.db.get_value('Raw Material Consumption', sr2, 'qty_foam_cup_per_m_prs')
        //     .then(r => {
        //         console.log(r.message.qty_foam_cup_per_m_prs) 
        //     })
    },

    // test_dialog(frm) {

    //     frappe.db.get_list('Size', {
    //         fields: ['no', 'size'],
    //         filters: {
    //             no: '2'
    //         }
    //     }).then(records => {
    //         console.log(records);
    //     })

    //     // function test_button() {
    //     //     frappe.msgprint("Button Click");
    //     // }

    //     // var d = new frappe.ui.Dialog({
    //     //     'fields': [
    //     //         {'fieldname': 'ht', 'fieldtype': 'HTML'},
    //     //         {'fieldname': 'today', 'fieldtype': 'Date', "label": "Date", 'default': frappe.datetime.nowdate()},
    //     //         {'fieldname': 'name', 'fieldtype': 'Data', "label": "Date", 'name': 'test_data', 'default': frappe.datetime.nowdate()},
    //     //         {'fieldname': 'button', 'fieldtype': 'Button', "label": "Button", 'name': 'test_button', },
        
    //     //     ],
    //     //     test_button(frm) {
    //     //         console.log("Button Click 1");
    //     //         frappe.msgprint("Button Click 1");
    //     //     },
    //     //     // size:'small',
    //     //     // size:'large',
    //     //     size:'extra-large',
    //     //     primary_action: function(){
    //     //         d.hide();
    //     //         console.log(d.get_values());
    //     //         msgprint(d.get_values());
    //     //     },
    //     //     secondary_action_label:"Cancel",
    //     //     secondary_action: function(){
    //     //         console.log("Secondary Action")
    //     //         d.hide();
    //     //     }, 
    //     //     btn1: function(){
    //     //         console.log("Btn 1");
    //     //     }
    //     // });
    //     // d.fields_dict.ht.$wrapper.html('Title <input type="button" name="btn1" id="btn1" value="Button" onclick="parent.test_button(); console.log(735);")></input>');
    //     // // d.fields_dict.ht.$wrapper.html('');
    //     // d.show();
    // },

});
