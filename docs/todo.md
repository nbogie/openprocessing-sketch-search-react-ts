# todo

- if a sketch url is pasted into the user id, hit the API for it and get and populate the user id that way
- order results by recency (of creation or of update)
- have short format export also include full link to sketch? it's much more useful in most cases.
- change linkOnly export formatter to use markdown bulleted list, not JSON (e.g. for a discord post / a readme)
- add saved searches.
    - A button to save any search (includes search term, fuzzy switch, mode toggles).
    - prev searches maybe we can show...
        - as list in left navbar. click one it applies and dismisses nav if it's full-screen.
        - or as dropdown menu entries

- add boolean logic for filtering?

- mobile?
    - for mobile maybe just show first 10 or so results. Most people just trying to find a specific sketch, not browse

- don't show userId by default once it's set? (if all use cases are for consuming our own stuff).
    - however, teachers might have multiple accounts.

- allow create, save (local storage) and export to json of lists of sketches (e.g. matching certain search results):
    - export:
        - at least json.
        - maybe markdown, too (for easy posting to discord, etc)
    - use-cases: I want...
        - all my sketch ids for all my 3d examples, say
        - all my sketches between date x and y
        - all sketches marked:
            - example
            - starter
            - exercise
            - exercise solution
        - all my genuary sketches for this year
        - all my sketches that use webgpu
        - all using library X (socket.io, matter.js / tone.js / ml5 / three.js)

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

- reverse order of results from API so most recent first (currently)
- fix bug where missing description would prevent display of search results.
- deal with applet mode sketches? (all archived, i think but code is available). This is probably not worth it - offering as a filter is more noise - ppl can search by text. More code to maintain and test.
- pasting an openprocessing user url into the userId field grabs that userId
- linkify any links found in the descriptions (albeit through a confirmation modal)
- add linkOnly export formatter
- fix localstorage for userID
- add toast to give feedback about user actions
- allow filter by sketch type (p5js, html, other (legacy ones?)
- fuzzy search for filtering?
- don't search without a userId
- don't show "get all sketches" without a valid userid present
- store userId in local storage
- change "fetch all sketches from API" to "Re-fetch all sketches from API!" once we have some, to discourage unnecessary use.
- add nice tooltips to clarify what stuff does
- scrollbars: blech
