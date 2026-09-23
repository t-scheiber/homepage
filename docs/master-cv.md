# CV updates

The master CV lives in `career-workspace/services/cv`. The website PDF is a generated
copy. Do not edit it independently or copy a tailored application CV over it.

From the career workspace, run:

```sh
python services/automation/master_profile.py --write-source
python services/automation/export_master_cv.py --output /path/to/output --homepage /path/to/this/homepage
```

This copies the same validated PDF used by the master CV build, updates the asset
manifest and exports public profile fields to `lib/professional-profile.json`.
The profile records the source revision, content fingerprint and PDF checksum.
The website test rejects a PDF that no longer matches that export.

Only the explicit public projection belongs here. Never copy the private
`applicant-facts.json`, application answers, employer evidence or submitted documents
into this public repository. Publish changes through the normal PR and deployment
checks. LinkedIn profile edits must be verified separately in the signed-in profile.
