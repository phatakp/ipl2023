import { RuleTable } from "./RuleTable";
import { StakeTable } from "./StakeTable";

export const RulesPage = () => {
    return (
        <div
            className={`relative mt-24 w-screen bg-cover bg-center bg-no-repeat p-2 md:px-8`}
            style={{
                backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/scheduleBg.jpg')`,
            }}
        >
            <h1 className="mb-6 text-4xl font-extrabold">Game Rules</h1>
            <h2 className="text-2xl text-red-800">
                Predict the winner of every IPL game and earn big !!
            </h2>
            <hr />

            <ul className="leading-loose">
                <li>
                    <h4 className="mt-8 text-xl">Prediction</h4>
                    <ol className="ml-4 list-inside list-disc">
                        <li className="mt-2 font-bold">
                            Every player has to predict the winner of the match
                            atleast 30 minutes before start of the match.
                        </li>
                        <li className="">
                            Minimum Stake is applicable for each match as below.{" "}
                            <strong>No Maximum Limit.</strong>
                            <ul className="ml-8">
                                For League Matches - <strong>Rs.30</strong>
                            </ul>
                            <ul className="ml-8">
                                For Knockout/Qualifiers - <strong>Rs.50</strong>
                            </ul>
                            <ul className="ml-8">
                                For Final Match - <strong>Rs.100</strong>
                            </ul>
                        </li>
                        <li className="text-red-700">
                            In case a player does not predict before the cutoff,
                            an amount equivalent to minimum stake applicable for
                            the match will deducted from player's balance.
                        </li>
                        <li>
                            <span className="font-bold">
                                Prediction can be updated up until the start of
                                the match.
                            </span>
                            <br />
                            Rules for same are defined as -
                            <ol className="ml-4 list-inside list-disc">
                                <li>
                                    Only increase in stake amount is allowed.
                                </li>
                                <li>
                                    Team change is allowed, however the stake
                                    amount has to be atleast double of the
                                    existing value.
                                </li>
                            </ol>
                        </li>
                    </ol>
                </li>

                <li>
                    <h4 className="mt-8 text-xl">Pre Requisites</h4>
                    <ol className="ml-4 list-inside list-disc">
                        <li className="font-bold">
                            Every player who registers has to complete the whole
                            tournament.
                        </li>
                        <li>
                            Every player has to predict the overall IPL winner
                            at time of registration. An automatic stake of
                            Rs.500 will be applicable for this case, which will
                            be settled after final match.
                        </li>
                        <li className="font-bold">
                            IPL Winner prediction can be changed up until the
                            completion of Match 35. You can use the Change IPL
                            Winner button under your profile (on top right
                            corner).
                        </li>
                        <li>
                            <span className="text-red-700">
                                After registration a caution deposit of Rs.500
                                has to be made
                            </span>{" "}
                            on phone number{" "}
                            <strong>9130469142 (PhonePe/GPay)</strong>. Only
                            then you will be allowed to predict the matches.
                            This deposit will be adjusted to your current
                            balance on dashboard.
                        </li>
                    </ol>
                </li>

                <li>
                    <h4 className="mt-8 text-xl">Settlement</h4>
                    <ol className="ml-4 list-inside list-disc">
                        <li>
                            All stakes will be settled at end of each match as
                            below -
                            <ul className="ml-8">
                                For Losing stakes, amount equivalent to stake to
                                be debited from balance.
                            </ul>
                            <ul className="ml-8">
                                For Winning stakes, amount will be credited to
                                balance as per below formula.
                                <li className="font-bold">
                                    Credit Amount = (Your Stake / Total Winning
                                    Stake Amount) * Total Losing Stake Amount
                                </li>
                            </ul>
                        </li>
                        <li className="text-red-700">
                            Higher the stakes, higher will be the return.
                        </li>
                    </ol>
                </li>

                <li>
                    <h4 className="mt-8 text-xl">Double Cards</h4>
                    <ol className="ml-4 list-inside list-disc">
                        <li>
                            Each player will be awarded a total of 5 double
                            cards to be utilized in{" "}
                            <span className="font-bold">
                                league matches only.
                            </span>
                        </li>
                        <li className="text-red-700">
                            Double card can only be applied after start of the
                            match and up until 1 hour post the start.
                        </li>
                        <li className="font-bold">
                            Only one player can play the double card in a match.
                        </li>
                        <li className="text-red-700">
                            Any unutilized double cards at the end of league
                            stage will be exhausted.
                        </li>
                        <li className="font-bold">
                            When a player uses a double card his/her stake for
                            the match will also be doubled.
                        </li>
                        <li>
                            {" "}
                            Settlement of double card will be as below -
                            <ul className="ml-8 list-inside list-disc">
                                <strong className="text-red-700">
                                    In case double player wins -{" "}
                                </strong>
                                <li>
                                    All losing stakes will be doubled, and half
                                    of the amount will be credited to double
                                    card player.
                                </li>
                                <li>
                                    For the other half, settlement will be done
                                    as per regular ratio process.
                                </li>
                                <li>
                                    Other winner(s) (other than double card
                                    player) will not be affected and will get
                                    same amount, as when double card was not
                                    played.
                                </li>
                            </ul>
                            <ul className="mt-3 ml-8 list-inside list-disc">
                                <strong className="text-danger">
                                    In case double player loses -{" "}
                                </strong>
                                <li>
                                    Settlement will be done as per usual ratio
                                    formula
                                </li>
                            </ul>
                        </li>
                        <li>
                            Below table shows the sample stakes for the CSK vs
                            KKR match and applicable settlements after the
                            match.{" "}
                            <strong>
                                "D" in the row shows double card player.
                            </strong>
                            <h5 className="mt-4 text-lg">
                                Stakes before the match
                            </h5>
                            <StakeTable />
                            <h5 className="mt-4 text-lg">
                                Result after the Match
                            </h5>
                            <RuleTable />
                        </li>
                    </ol>
                </li>
            </ul>

            <h1 className="mt-8 text-4xl font-extrabold">Play Bold !!</h1>
        </div>
    );
};
