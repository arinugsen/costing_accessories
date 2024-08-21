# Copyright (c) 2024, PT BRA IT Dept and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class RawMaterialConsumption(Document):
	pass

@frappe.whitelist()
def test():
	return "test"


@frappe.whitelist()
def get_size(sz):
	size_row = frappe.db.get_value('Size', sz, ['kd_l', 'kd_w', 'pd_l', 'pd_w', 'md_l', 'md_w'], as_dict=1)
	# size_row.kd_l
	# size_row.kd_w

	return size_row

