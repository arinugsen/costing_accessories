app_name = "costing_accessories"
app_title = "Costing for Accessories"
app_publisher = "PT BRA IT Dept"
app_description = "Costing for Accessories"
app_email = "it2@bra-indo.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/costing_accessories/css/costing_accessories.css"
# app_include_js = "/assets/costing_accessories/js/costing_accessories.js"

# include js, css files in header of web template
# web_include_css = "/assets/costing_accessories/css/costing_accessories.css"
# web_include_js = "/assets/costing_accessories/js/costing_accessories.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "costing_accessories/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}

# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_list_js = {"doctype" : "public/js/size_list.js"}
# doctype_list_js = {"doctype" : "public/js/custom_list.js"}
# doctype_list_js = {"Size" : "costing_for_accessories/doctype/size/size_list.js"}

# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "costing_accessories/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "costing_accessories.utils.jinja_methods",
# 	"filters": "costing_accessories.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "costing_accessories.install.before_install"
# after_install = "costing_accessories.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "costing_accessories.uninstall.before_uninstall"
# after_uninstall = "costing_accessories.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "costing_accessories.utils.before_app_install"
# after_app_install = "costing_accessories.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "costing_accessories.utils.before_app_uninstall"
# after_app_uninstall = "costing_accessories.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "costing_accessories.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"costing_accessories.tasks.all"
# 	],
# 	"daily": [
# 		"costing_accessories.tasks.daily"
# 	],
# 	"hourly": [
# 		"costing_accessories.tasks.hourly"
# 	],
# 	"weekly": [
# 		"costing_accessories.tasks.weekly"
# 	],
# 	"monthly": [
# 		"costing_accessories.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "costing_accessories.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "costing_accessories.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "costing_accessories.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["costing_accessories.utils.before_request"]
# after_request = ["costing_accessories.utils.after_request"]

# Job Events
# ----------
# before_job = ["costing_accessories.utils.before_job"]
# after_job = ["costing_accessories.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"costing_accessories.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

