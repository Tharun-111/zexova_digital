<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Admin area lives at /admin (ssr:false layout with inline login); access is the single admin role via has_role, first signup claims it through claim_first_admin. Why: one administrator, no client accounts.
- Project images go in the private project-images bucket and are stored as long-lived signed URLs. Why: workspace blocks public buckets.
