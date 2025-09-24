create policy "Enable insert for authenticated users only"
on "public"."repo"
as permissive
for insert
to authenticated
with check (true);



