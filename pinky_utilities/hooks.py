app_name = "pinky_utilities"
app_title = "Pinky Utilities"
app_publisher = "Pinky Development"
app_description = "Collection of utilities and helpers suited for pinky pistache frappe env."
app_email = "grtavares@ucs.br"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "pinky_utilities",
# 		"logo": "/assets/pinky_utilities/logo.png",
# 		"title": "Pinky Utilities",
# 		"route": "/pinky_utilities",
# 		"has_permission": "pinky_utilities.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_js = "/assets/pinky_utilities/js/pinky_utilities.js"
# app_include_css = "/assets/pinky_utilities/css/pinky_utilities.css"

app_include_js = [
  "helpers.pinky.bundle.js",
  "item.pinky.bundle.js",
  "input_mask.pinky.bundle.js",
  "service.pinky.bundle.js",
  "forms.pinky.bundle.js",
]

# include js, css files in header of web template
# web_include_css = "/assets/pinky_utilities/css/pinky_utilities.css"
# web_include_js = "/assets/pinky_utilities/js/pinky_utilities.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "pinky_utilities/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

doctype_js = {
  "Customer" : "public/js/doctype/Customer.js",
  "Address" : "public/js/doctype/Address.js",
  "Item" : "public/js/doctype/Item.js",
}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "pinky_utilities/public/icons.svg"

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
# 	"methods": "pinky_utilities.utils.jinja_methods",
# 	"filters": "pinky_utilities.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "pinky_utilities.install.before_install"
# after_install = "pinky_utilities.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "pinky_utilities.uninstall.before_uninstall"
# after_uninstall = "pinky_utilities.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "pinky_utilities.utils.before_app_install"
# after_app_install = "pinky_utilities.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "pinky_utilities.utils.before_app_uninstall"
# after_app_uninstall = "pinky_utilities.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "pinky_utilities.notifications.get_notification_config"

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
# 		"pinky_utilities.tasks.all"
# 	],
# 	"daily": [
# 		"pinky_utilities.tasks.daily"
# 	],
# 	"hourly": [
# 		"pinky_utilities.tasks.hourly"
# 	],
# 	"weekly": [
# 		"pinky_utilities.tasks.weekly"
# 	],
# 	"monthly": [
# 		"pinky_utilities.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "pinky_utilities.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "pinky_utilities.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "pinky_utilities.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["pinky_utilities.utils.before_request"]
# after_request = ["pinky_utilities.utils.after_request"]

# Job Events
# ----------
# before_job = ["pinky_utilities.utils.before_job"]
# after_job = ["pinky_utilities.utils.after_job"]

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
# 	"pinky_utilities.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

