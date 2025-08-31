gp:
	git add .
	git commit -m "$(filter-out $@,$(MAKECMDGOALS))"
	git push

pd:
	rm -rf public/*
	hugo

# Catch and ignore additional arguments
%:
	@: