# todo

- fix localstorage for userID

- add boolean logic for filtering?

- mobile?
    - for mobile maybe just show first 10 or so results. Most people just trying to find a specific sketch, not browse

- don't show userId by default once it's set? (if all use cases are for consuming our own stuff).
    - tho, teachers might have multiple accounts.

- allow create, save (local storage) and export to json of lists of sketches (e.g. matching certain search results):
    - export:
        - at least json.
        - maybe markdown, too (for easy posting to discord, etc)
    - use-cases: I want...
        - all my sketch ids for all my 3d examples, say
        - all my sketches between date x and y
        - all my genuary sketches for this year
        - all my sketches that use webgpu

- saved lists:
    - "to study" / "study fork"
    - example
    - exercise
    - genuary
    - matter.js / matterjs
    - tone.js / tonejs
    - p5.strands
    - socket.io / socketio

## done:

- add toast to give feedback about user actions
- allow filter by sketch type (p5js, html, other (legacy ones?)
- fuzzy search for filtering?
- don't search without a userId
- don't show "get all sketches" without a valid userid present
- store userId in local storage
- change "fetch all sketches from API" to "Re-fetch all sketches from API!" once we have some, to discourage unnecessary use.
- add nice tooltips to clarify what stuff does
- scrollbars: blech
