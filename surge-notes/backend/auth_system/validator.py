from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _


class DuplicateValidator(object):
    def validate(self, password, user=None):
        if any(c1 == c2 for c1, c2 in zip(password, password[1:])):
            raise ValidationError(
                _("The password must not contain two consecutive same charecter"),
                code='password_two_consecutive_same',
            )

    def get_help_text(self):
        return _(
            "The password must not contain two consecutive same charecter"
        )


