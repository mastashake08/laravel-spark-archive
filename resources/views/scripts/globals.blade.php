<!-- Laravel Spark Globals -->
<script>
    window.Spark = {
        // Laravel CSRF Token
        csrfToken: '{{ csrf_token() }}',

        // Current User ID
        userId: {!! Auth::user() ? Auth::id() : 'null' !!},

        // Current Team ID
        @if (Auth::user() && Spark::usingTeams() && Auth::user()->hasTeams())
            currentTeamId: {{ Auth::user()->currentTeam->id }},
        @else
            currentTeamId: null,
        @endif

        // Flatten errors and set them on the given form
        setErrorsOnForm: function (form, errors) {
            if (typeof errors === 'object') {
                form.errors = _.flatten(_.toArray(errors));
            } else {
                form.errors.push('Something went wrong. Please try again.');
            }
        }
    }
</script>
