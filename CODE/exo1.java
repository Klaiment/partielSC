import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class OrderSystem {
    private Map<Integer, List<String>> orderList = new HashMap<>();
    public void addNewOrder(Integer customerID, String itemName) {
        List<String> items = orderList.getOrDefault(customerID, new ArrayList<>());
        items.add(itemName);
        orderList.put(customerID, items);
    }
    public void modifyOrder(Integer customerID, Integer itemIndex, String newItemName) {
        List<String> items = orderList.get(customerID);
        if (items == null) {
            throw new IllegalArgumentException("No order found for customer ID: " + customerID);
        }
        if (itemIndex < 0 || itemIndex >= items.size()) {
            throw new IndexOutOfBoundsException("Invalid item index: " + itemIndex);
        }
        items.set(itemIndex, newItemName);
    }

    public void removeOrder(Integer customerID, Integer itemIndex) {
        List<String> items = orderList.get(customerID);
        if (items == null) {
            throw new IllegalArgumentException("No order found for customer ID: " + customerID);
        }
        if (itemIndex < 0 || itemIndex >= items.size()) {
            throw new IndexOutOfBoundsException("Invalid item index: " + itemIndex);
        }
        items.remove(itemIndex);
    }

    public void printOrders() {
        for (Map.Entry<Integer, List<String>> entry : orderList.entrySet()) {
            System.out.println("Customer ID: " + entry.getKey());
            List<String> items = entry.getValue();
            if (items != null && !items.isEmpty()) {
                System.out.println("Items: " + String.join(", ", items));
            } else {
                System.out.println("Items: none");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        // Je simule ici l'ajout, la modification et la suppression de commandes sur une interface utilisateur d'ou le francais.
        OrderSystem orderSystem = new OrderSystem();

        orderSystem.addNewOrder(1, "Televison");
        orderSystem.addNewOrder(1, "Ordinateur");
        orderSystem.addNewOrder(2, "Ecran");

        System.out.println("Commandes initiales :");
        orderSystem.printOrders();

        orderSystem.modifyOrder(1, 1, "Ecran plat");
        System.out.println("Commandes après modification :");
        orderSystem.printOrders();

        orderSystem.removeOrder(2, 0);
        System.out.println("Commandes après retrait :");
        orderSystem.printOrders();
    }
}

