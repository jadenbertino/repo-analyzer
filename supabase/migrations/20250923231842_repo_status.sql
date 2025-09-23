create type "public"."repo_status" as enum ('reviewing', 'bugs', 'healthy', 'error', 'archived');
alter table "public"."repo" alter column "status" set default 'reviewing'::repo_status;
alter table "public"."repo" alter column "status" set data type repo_status using "status"::repo_status;
create policy "Enable users to view their own data only"
on "public"."repo"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));