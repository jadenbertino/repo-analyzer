-- Add SELECT policy for repo table
create policy "Enable select for users based on user_id"
on "public"."repo"
as permissive
for select
to authenticated
using (auth.uid() = user_id);

-- Add DELETE policy for repo table
create policy "Enable delete for users based on user_id"
on "public"."repo"
as permissive
for delete
to authenticated
using (auth.uid() = user_id);

-- Add UPDATE policy for repo table (good to have)
create policy "Enable update for users based on user_id"
on "public"."repo"
as permissive
for update
to authenticated
using (auth.uid() = user_id);