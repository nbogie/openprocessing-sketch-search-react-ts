## pagination notes from openprocessing public api v2

Pagination on Arrays
All endpoints that return an array accept limit, offset, and sort as optional query parameters.
ParameterDescriptionlimit

Number of results to return

offset

Number of results to skip

sort

asc or desc — sorted on the most relevant column per endpoint (e.g. createdOn for sketches, submittedOn for curation sketches, heartedOn for hearts)

The response headers will include a hasMore boolean. When true, use a subsequent call with an updated offset to retrieve the next page.
Example: https://openprocessing.org/api/user/1/sketches?limit=10&offset=0&sort=desc
