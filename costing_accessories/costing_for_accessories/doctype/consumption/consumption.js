// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Consumption", {
	refresh(frm) {

	},

    pd_l(frm) { set_qty_consumption(frm); },
    pd_w(frm) { set_qty_consumption(frm); },
    // md_l(frm) { set_qty_consumption(frm); },
    md_w(frm) { set_qty_consumption(frm); },
    pq_l(frm) { set_qty_consumption(frm); },

    type_mold(frm) {
        var type_mold = frm.doc.type_mold;
        if (type_mold == "One Up") {
            frm.set_value("qty_foam_cup_prs", 0.5);
        } else if (type_mold == "Two Up") {
            frm.set_value("qty_foam_cup_prs", 1);
        } else if (type_mold == "Four Up") {
            frm.set_value("qty_foam_cup_prs", 2);
        } else if (type_mold == "Six Up") {
            frm.set_value("qty_foam_cup_prs", 3);
        } else if (type_mold == "Eight Up") {
            frm.set_value("qty_foam_cup_prs", 4);
        }
    },
    
    qty_foam_cup_prs(frm) {
        var qty_per_m_prs = frm.doc.qty_per_m_prs;
        var qty_foam_cup_prs = frm.doc.qty_foam_cup_prs;
        var qty_foam_cup_per_m_prs =  qty_per_m_prs*qty_foam_cup_prs;

        console.log(qty_per_m_prs);
        console.log(qty_foam_cup_prs);
        console.log(qty_foam_cup_per_m_prs);
        if (qty_per_m_prs>0 && qty_foam_cup_prs>0) {
            frm.set_value("qty_foam_cup_per_m_prs", qty_foam_cup_per_m_prs);
        } else {
            frm.set_value("qty_foam_cup_per_m_prs", "");
        }
	},
});


function set_qty_consumption(frm) {
    // var kd_l = frm.doc.kd_l;
    // var kd_w = frm.doc.kd_w;
    var pd_l = frm.doc.pd_l;
    var pd_w = frm.doc.pd_w;
    // var md_l = frm.doc.md_l;
    var md_w = frm.doc.md_w;
    var pq_l = frm.doc.pq_l;

    if ( (pd_l != "" && pd_l > 0) && (pq_l != "" && pq_l > 0) && (pd_w != "" && pd_w > 0) && (md_w != "" && md_w > 0) ){
        var md_l =  pd_l * pq_l;
        var pq_w =  md_w / pd_w;
        
        // var pq_w_ = pq_w.toFixed(4);
        var pq_w_ = pq_w.toFixed(1);
        var pq_w_arr = pq_w_.toString().split(".");
        console.log("pq_w");
        console.log("ori: "+ pq_w);
        console.log("fix: "+ pq_w_);
        var pq_w_fix = 0;
        // if (0<=Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1])<=4999) {
        //     pq_w_fix = pq_w_arr[0];
        // } else if (5000<=Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1])<=9999) {
        //     pq_w_fix = pq_w_arr[0]+".5";
        // }

        if (pd_l <= pd_w) {
            // pd_l < pd_w = 3.9 - 4.3 => 4   // 4.4 - 4.8 => 4.5     // 4.9 - 5.3 => 5
            if (Number.parseInt(pq_w_arr[1]) < 4) {
                pq_w_fix = pq_w_arr[0];
            } else if (4 <= Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1]) <= 8) {
                // pq_w_fix = pq_w_arr[0] + ".5";
                var type_mold = frm.doc.type_mold;
                if (type_mold == "One Up") {
                    pq_w_fix = pq_w_arr[0];
                } else {
                    pq_w_fix = pq_w_arr[0] + ".5";
                }
            } else if (Number.parseInt(pq_w_arr[1]) > 8) {
                pq_w_fix = Number.parseInt(pq_w_arr[0]) + 1;
            }
        } else if (pd_l > pd_w) {
            // pd_l > pd_w = 3.8 - 4.7 => 4   // 4.7 - 5.7 => 5
            if (Number.parseInt(pq_w_arr[1]) < 8) {
                pq_w_fix = pq_w_arr[0];
            } else if (Number.parseInt(pq_w_arr[1]) > 7) {
                pq_w_fix = Number.parseInt(pq_w_arr[0]) + 1;
            }
        }
        // } else {
        //     var type_mold = frm.doc.type_mold;
        //     if (pd_l == pd_w && type_mold != "One Up") {
        //         // pd_l < pd_w = 3.9 - 4.3 => 4   // 4.4 - 4.8 => 4.5     // 4.9 - 5.3 => 5
        //         if (Number.parseInt(pq_w_arr[1]) < 4) {
        //             pq_w_fix = pq_w_arr[0];
        //         } else if (4 <= Number.parseInt(pq_w_arr[1]) && Number.parseInt(pq_w_arr[1]) <= 8) {
        //             pq_w_fix = pq_w_arr[0] + ".5";
        //         } else if (Number.parseInt(pq_w_arr[1]) > 8) {
        //             pq_w_fix = Number.parseInt(pq_w_arr[0]) + 1;
        //         }
        //     } 
        // }

        frm.set_value("md_l", md_l.toFixed(1));
        frm.set_value("pq_w", pq_w_fix);
        

        // var pq_w_fix_ = Number.parseFloat(pq_w_fix).toFixed(4);
        var pq_w_fix_ = Number.parseFloat(pq_w_fix).toFixed(1);
        var consumption =  (md_l / 100) / (pq_l * pq_w_fix_);
        var consumption_ =  consumption.toFixed(4);
        frm.set_value("consumption", consumption_);
        
        var qty_per_m_prs =  1 / consumption;
        // var qty_per_m_prs_ =  qty_per_m_prs.toFixed(4);
        var qty_per_m_prs_ =  qty_per_m_prs.toFixed(1);
        var qty_per_m_prs_arr = qty_per_m_prs_.toString().split(".");
        console.log("qty_per_m_prs");
        console.log("ori: "+ qty_per_m_prs);
        console.log("fix: "+ qty_per_m_prs_);
        var qty_per_m_prs_fix;
        // if (0<=Number.parseInt(qty_per_m_prs_arr[1]) && Number.parseInt(qty_per_m_prs_arr[1])<=4999) {
        //     qty_per_m_prs_fix = qty_per_m_prs_arr[0];
        // } else if (5000<=Number.parseInt(qty_per_m_prs_arr[1]) && Number.parseInt(qty_per_m_prs_arr[1])<=9999) {
        //     qty_per_m_prs_fix = qty_per_m_prs_arr[0]+".5";
        // }

        // pd_l < pd_w = 3.9 - 4.3 => 4   // 4.4 - 4.8 => 4.5     // 4.9 - 5.3 => 5
        if (Number.parseInt(qty_per_m_prs_arr[1]) < 4) {
            qty_per_m_prs_fix = qty_per_m_prs_arr[0];
        } else if (4 <= Number.parseInt(qty_per_m_prs_arr[1]) && Number.parseInt(qty_per_m_prs_arr[1]) <= 8) {
            qty_per_m_prs_fix = qty_per_m_prs_arr[0] + ".5";
        } else if (Number.parseInt(qty_per_m_prs_arr[1]) > 8) {
            qty_per_m_prs_fix = Number.parseInt(qty_per_m_prs_arr[0]) + 1;
        }
    
        frm.set_value("qty_per_m_prs", qty_per_m_prs_fix);
    
        var qty_foam_cup_prs = frm.doc.qty_foam_cup_prs;
        if (qty_foam_cup_prs != "" && qty_foam_cup_prs > 0) {
            var qty_foam_cup_per_m_prs =  qty_per_m_prs_fix * qty_foam_cup_prs;
            frm.set_value("qty_foam_cup_per_m_prs", qty_foam_cup_per_m_prs);
        }
    }

}
