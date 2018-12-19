UTIL := @docker-compose -f docker-compose.yml run --rm

clean:
	@docker-compose down -v

start: setup
	${UTIL} --service-ports app yarn dev

setup:
	${UTIL} app yarn

yarn:
	${UTIL} app yarn ${C}
