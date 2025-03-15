import Container from "../Layout/Container";
import TodaySales from "./TodaySales";
import MonthSellsList from "./MonthSellsList";

const MonthSells = () => {
	return (
		<div className="pt-[10px]">
			<Container>
				<TodaySales title={"This Month"} />
			</Container>
			<MonthSellsList />
		</div>
	);
};

export default MonthSells;
