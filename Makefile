gitpush:
	git add .
	git commit -m "$(filter-out $@,$(MAKECMDGOALS))"
	git push

# Catch and ignore additional arguments
%:
	@: