// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Raw Material Consumption", {
	refresh(frm) {
        
	},

    size(frm) {
        frappe.call({
            method:
                "costing_accessories.costing_for_accessories.doctype.raw_material_consumption.raw_material_consumption.get_size",
            type: "GET",
            args: {
                sz: frm.doc.size
            },
            callback: function(r) {
                if (r.message) {
                    var msg = r.message
                    console.log(msg)
                    
                    var kd_l = msg.kd_l
                    var kd_w = msg.kd_w
                    var pd_l = msg.pd_l
                    var pd_w = msg.pd_w
                    var md_l = msg.md_l
                    var md_w = msg.md_w
                    frm.set_value("kd_l", kd_l)
                    frm.set_value("kd_w", kd_w)
                    frm.set_value("pd_l", pd_l)
                    frm.set_value("pd_w", pd_w)
                    frm.set_value("md_l", md_l)
                    frm.set_value("md_w", md_w)
                    
                    var pq_l =  md_l/pd_l
                    var pq_w =  md_w/pd_w

                    var pq_w_ = pq_w.toFixed(4)
                    var pq_w_arr = pq_w_.toString().split(".")
                    console.log("ori: "+ pq_w)
                    console.log("fix: "+ pq_w_)
                    var pq_w_fix
                    if (0<=Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1])<=4999) {
                        pq_w_fix = pq_w_arr[0]
                    } else if (5000<=Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1])<=9999) {
                        pq_w_fix = pq_w_arr[0]+".5"
                    }
                    frm.set_value("pq_l", pq_l)
                    frm.set_value("pq_w", pq_w_fix)
                    
                    var pq_w_fix_ = Number.parseFloat(pq_w_fix).toFixed(4)
                    var consumption =  (md_l/100)/(pq_l*pq_w_fix_)
                    var consumption_ =  consumption.toFixed(4)
                    frm.set_value("consumption", consumption_)
                    
                    var qty_per_m_prs =  1/consumption
                    var qty_per_m_prs_ =  qty_per_m_prs.toFixed(4)
                    var qty_per_m_prs_arr = qty_per_m_prs_.toString().split(".")
                    console.log("ori: "+ qty_per_m_prs)
                    console.log("fix: "+ qty_per_m_prs_)
                    var qty_per_m_prs_fix
                    if (0<=Number.parseInt(qty_per_m_prs_arr[1]) && Number.parseInt(qty_per_m_prs_arr[1])<=4999) {
                        qty_per_m_prs_fix = qty_per_m_prs_arr[0]
                    } else if (5000<=Number.parseInt(qty_per_m_prs_arr[1]) && Number.parseInt(qty_per_m_prs_arr[1])<=9999) {
                        qty_per_m_prs_fix = qty_per_m_prs_arr[0]+".5"
                    }

                    frm.set_value("qty_per_m_prs", qty_per_m_prs_fix)


                    var qty_foam_cup_prs = frm.doc.qty_foam_cup_prs
                    if (qty_foam_cup_prs!="" && qty_foam_cup_prs>0) {
                        var qty_foam_cup_per_m_prs =  qty_per_m_prs_fix*qty_foam_cup_prs
                        frm.set_value("qty_foam_cup_per_m_prs", qty_foam_cup_per_m_prs);
                    }
                }
            },
            error: (r) => {
                // on error
            }
        });
	},

    qty_foam_cup_prs(frm) {
        var qty_per_m_prs = frm.doc.qty_per_m_prs
        var qty_foam_cup_prs = frm.doc.qty_foam_cup_prs
        var qty_foam_cup_per_m_prs =  qty_per_m_prs*qty_foam_cup_prs

        console.log(qty_per_m_prs)
        console.log(qty_foam_cup_prs)
        console.log(qty_foam_cup_per_m_prs)
        if (qty_per_m_prs>0 && qty_foam_cup_prs>0) {
            frm.set_value("qty_foam_cup_per_m_prs", qty_foam_cup_per_m_prs);
        } else {
            frm.set_value("qty_foam_cup_per_m_prs", "");
        }
	},
});
