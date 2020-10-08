# 연습문제 1
SELECT `name`, debut FROM girl_group
	WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'

# 연습문제 2
SELECT `name`, debut, title
	FROM 	girl_group AS le
	JOIN song AS ri
	ON le.hit_song_id=ri.sid
	WHERE debut BETWEEN '2009-01-01' AND '2009-12-31'
	ORDER BY debut

# 연습문제 3
SELECT le.Continent as continent, COUNT(*) as countCont,
    round(SUM(le.GNP)) AS sumCont,
	round(avg(le.GNP)) AS avgCont
    FROM country
    GROUP BY Continent;

# 연습문제 4
SELECT continent,
	le.Name AS countryName,
	ri.Name AS cityName, ri.Population AS population
	FROM country AS le
	JOIN citycopy AS ri
	ON le.Code=ri.CountryCode
	WHERE Continent='asia'
	ORDER BY population DESC
	LIMIT 10;

# 연습문제 5
SELECT name,population,Language
    FROM countrylanguage AS le
    JOIN citycopy AS ri
    ON le.CountryCode=ri.CountryCode
    WHERE IsOfficial='T'
    ORDER BY population DESC
    LIMIT 10;